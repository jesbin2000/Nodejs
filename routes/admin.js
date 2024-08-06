const express = require('express');
const adminRouter = express();
const adminController = require('../controllers/admin/adminController');
const {authMiddleware} = require('../middleware/adminMiddleware');


adminRouter.get('/admin', adminController.signInLayout);

adminRouter.get('/adminPage', adminController.adminPage);

adminRouter.post('/adminPage',  adminController.adminSignIn);

adminRouter.get('/userProfile/:id', adminController.userPost);

adminRouter.get('/userEdit/:id', adminController.userEditLayout);

adminRouter.post('/userEdit/:id', adminController.userEdit);

adminRouter.get('/userDelete/:id', adminController.userDelete );

module.exports = adminRouter ;