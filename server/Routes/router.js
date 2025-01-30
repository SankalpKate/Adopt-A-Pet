//path to resolve each client request
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const CartController = require('../Controllers/CartController')
//1) import express
const express = require("express")

//2) create an object for the class router in express
const router= new express.Router();

//3) define paths
router.post('/user/register',userController.register)


router.post('/user/login',userController.login)

router.post('/project/add',jwtMiddleware,multerConfig.single('image'),projectController.addProject)

router.get('/project/main-project',projectController.getMainProject)

router.post('/cart/add',multerConfig.single('productimage'),CartController.addCart)

router.get('/product/add',CartController.getProducts)

router.get('/project/user-project',jwtMiddleware,projectController.getUserProject)

router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)


//4) export router
module.exports = router;

