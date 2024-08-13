const express = require('express');
const adminRouter = express();
const adminController = require('../controllers/admin/adminController');
const {adminMiddleware} = require('../middleware/adminMiddleware');


adminRouter.get('/admin', adminController.signInLayout);

adminRouter.get('/adminPage',adminMiddleware, adminController.adminPage);

adminRouter.post('/adminPage',  adminController.adminSignIn);

adminRouter.get('/userProfile/:id', adminMiddleware,adminController.userPost);

adminRouter.post('/userProfile/:id', adminController.editPost )

adminRouter.get('/userEdit/:id', adminMiddleware, adminController.userEditLayout);

adminRouter.post('/userEdit/:id', adminController.userEdit);

adminRouter.get('/userDelete/:id', adminMiddleware,adminController.userDelete );

module.exports = adminRouter ;