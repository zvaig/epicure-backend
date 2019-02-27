'use strict';

var debug = require('debug');
var error = debug('userHandler:error');
var log = debug('userHandler:log');
var jwt = require('jsonwebtoken');
var async = require('async');
var moment = require('moment');
 
var tokenConfig = require('config').get('Security.Request.AdminToken');
 
var mongoose = require('mongoose'),
    Admin_User = require('../../../../db/models/userModel'),
    NormalAuth_Admin = require('../../../../db/models/authModel');
 
 
const bcrypt = require('bcrypt');
const saltRounds = 10; // the cost of processing the data (10 rounds, 2GHz: ~10 hashes/sec)
 
 
 
function createNewNormalUser(bodyParams, next) {
 let email = bodyParams.email
 let password = bodyParams.password
  
    if (!email || !password || !next) {
        var msg = 'invalid input';
        error(msg);
        next(new Error(msg));
        return;
    }
 
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            error('bcrypt.genSalt ' + err.message);
            return next(err);
        }
 
 
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                error('bcrypt.hash ' + err.message);
                return next(err);
            }
 
            var newNormAuth = new NormalAuth_Admin({
                email: email,
                Password: hash
            });
 
            newNormAuth.save(function (err, normalAuth) {
                if (err) {
                    if (err.code === 11000) {
                        var msg = 'email already exist';
                        error(msg);
                        return next(new Error(msg));
                    }
                    error(err.message);
                    return next(err);
                }
 
                createUser(null, normalAuth, {
                    email: email,
                    Password: password
                }, next);
            });
        });
    });
}
 
 
function createUser(fbAuth, normalAuth, userDetails, next) {
 
    var newUser = new Admin_User({
            email: userDetails.email
    });
 
    if (normalAuth) {
        newUser.normal_auth = normalAuth;
    } else {
        var msg = 'shouldnt be here error';
        error(msg);
        next(new Error(msg));
        return;
    }
 
    newUser.save(function (err, savedUser) {
        if (err) {
            next(err);
            return;
        }
 
        var updateAuthCallback = function (err, auth) {
            if (err) {
                error(err.message);
                return;
            }
 
            //create a token
            var midnight = new Date(); //the time at today midnight
            midnight.setHours(23);
            midnight.setMinutes(59);
            var seconds = Math.round(((midnight.getTime() - Date.now()) / 1000)); //how much seconds left till midnight
            seconds += 60 * 60 * 2; //adding buffer
            var token = jwt.sign({
                id: savedUser._id
            }, tokenConfig.value, {
                expiresIn: seconds // expires in 24 hours
            });
 
            var returnToken = {
                token: token,
                auth: true,
                user_id: savedUser._id
            };
 
            log('Update auth of saved user: ' + savedUser._id + ' successfully');
            next(null, returnToken);
 
        };
        // update user inside the auth
        if (normalAuth) {
            normalAuth.update({
                user: savedUser
            }, updateAuthCallback);
        }
    });
}
 
 
function loginHelper(bodyParams, next) {
    let email = bodyParams.email
    let password = bodyParams.password
    retrieveUserId(email, password, function (err, auth, isNormal) // userId, existPassword
    {
        if (err) {
            next(err);
            return;
        }
 
        var existPassword, expiry, tempPassword;
        if (isNormal) {
            existPassword = auth.password;
        }
        if (auth.forgot_password) {
            expiry = auth.forgot_password.expiry;
            tempPassword = auth.forgot_password.temp_password;
        }
 
        var userId = auth._id;
 
        var onLoginSuccess = () => Admin_User.find({'normal_auth': userId}).lean().exec(function (err, userFound) {
            if (err) {
                return next(err);
 
            }
 
            if (!userFound) {
                var msg = 'user doesn\'t exicted';
                error(msg);
                return next(new Error(msg));
            }
 
            //create a token
            var midnight = new Date(); //the time at today midnight
            midnight.setHours(23);
            midnight.setMinutes(59);
            var seconds = (midnight.getTime() - Date.now()) / 1000;//how much seconds left till midnight
            seconds += 60 * 60 * 2; //adding buffer
            seconds = Math.round(seconds);
            var token = jwt.sign({ id: userFound._id }, tokenConfig.value, {
                expiresIn: seconds // expires in 24 hours
            });
 
            userFound.token = token;
            let user = {
                email: userFound[0].email,
                token: token
            }
            delete userFound.normal_auth;
            return next(null, user);
        });
 
        // Check that user password match
        if (existPassword) {
            async.parallel(async.reflectAll({
                normalPass: async.apply(checkPasswordMatch, password, existPassword),
                forgotPass: function (cb) {
                    if (auth.forgot_password && moment() < moment(expiry)) {
                        return checkPasswordMatch(password, tempPassword, cb);
                    }
                    cb(new Error(''));
                }
            }), function (err, results) {
                if (err) {
                    error(err.message);
                    return next(err);
                }
 
                // If normal password and temp password works
                if (results.normalPass.error && results.forgotPass.error) {
                    var msg = 'incorrect details';
                    error(msg);
                    return next(new Error(msg));
                }
                onLoginSuccess();
            });
        }
        else {
            onLoginSuccess();
        }
    });
}
 
function retrieveUserId(email, password, next) {
    var retrievalCallback = function (err, auth, isNormal) // isNormal == true iff auth is normal
    {
        if (err) {
            return next(err);
        }
 
        if (!auth) {
            var msg = 'incorrect details';
            error(msg);
            return next(new Error(msg));
        }
 
        next(null, auth, isNormal);
    }
 
    if (email && password) {
        NormalAuth_Admin.findOne({ email }).exec((err, auth) => retrievalCallback(err, auth, true));
    }
    else {
        var msg = 'input parameters invalid';
        error(msg);
        next(new Error(msg));
        return;
    }
}
function checkPasswordMatch(password, existPassword, next) {
    bcrypt.compare(password, existPassword, function (err, res) {
        if (!res) {
            var msg = 'incorrect details';
            error(msg);
            return next(new Error(msg));
        }
        log('password matches');
        next();
    });
}
 

function verifyToken(token, cb){
    let key = tokenConfig.value
    jwt.verify(token, key, function(err, decoded) {
        if(err) return cb(err)
        else cb(null, decoded)
    });
}
 
module.exports = {
    createNewNormalUser,
    loginHelper,
    verifyToken
   
 
};