/**
 * This module routes any URL path that starts with: '.../api/v1/admin'
 */

'use strict';

const express = require('express');
const router = express.Router();

//controllers
const restaurantAdminController = require('../admin/controllers/restaurantsController');
const dishAdminController = require('../admin/controllers/dishesController');
const chefAdminController = require('../admin/controllers/chefsController');
const userAdminController = require('../admin/controllers/userController');

// const dishValidator = require('../validators/dishValidator')


//////////////////////////////////////////
router.route('/restaurants/getFilteredList')
    .get(restaurantAdminController.getFilteredList)
    
router.route('/restaurants/create')
        .post(restaurantAdminController.createRestaurant)   

router.route('/restaurants/updateOne')
    .put(restaurantAdminController.updateOne)    

router.route('/restaurants/deactivate')
    .post(restaurantAdminController.deactivateRestaurant)     


////////////////////////////////////////////////////
router.route('/dishes/getByDishId')
    .get(dishAdminController.getByDishId)

router.route('/dishes/getFilteredList')
    .get(dishAdminController.getFilteredList)

router.route('/dishes/create')
    .post(dishAdminController.createDish) 

router.route('/dishes/updateOne')
    .put(dishAdminController.updateOne)   

router.route('/dishes/deactivate')
    .post(dishAdminController.deactivateDish)    

/////////////////////////////////////////////

router.route('/chefs/getChefById')
    .get(chefAdminController.getChefById)   

router.route('/chefs/getFilteredList')
    .get(chefAdminController.getFilteredList)  
    
router.route('/chefs/create')
    .post(chefAdminController.createChef)    

router.route('/chefs/updateOne')
    .put(chefAdminController.updateOne)       

router.route('/chefs/deactivate')
    .post(chefAdminController.deactivateChef)        
    
///////////////////////////////////    
router.route('/user/checkLogin')
    .post(userAdminController.checkUserLogin)    

router.route('/user/registerNewUser')
    .post(userAdminController.registerNewUser)    

router.route('/user/verify')
    .post(userAdminController.verifyToken)        
module.exports = router;
//todo: first route with *