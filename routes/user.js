const express = require('express');
const userRouter = express();
const userController = require('../controllers/user/userController');
const {authMiddleware} = require('../middleware/userMIddleware');

// get request
userRouter.get("/" ,userController.mainContentLayout );

userRouter.get('/signIn', userController.signInLayout);

userRouter.get('/signup', userController.signUpLayout);

userRouter.get('/update/:id', userController.editPostLayout);

userRouter.get('/profile/:id', userController.profile);

userRouter.get('/addPost',userController.addPostLayout);

userRouter.get('/homePage', userController.mainContentLayout);

userRouter.get('/logout', userController.logOut);

userRouter.get('/viewPost/:id', userController.viewpost )

userRouter.delete('/delete/:id', userController.deletePost);



// Post response

userRouter.post('/signup', userController.userSignUp);

userRouter.post('/signIn', userController.usersignIn);

userRouter.post('/addPost', userController.addPost);

userRouter.post('/profile/:id', userController.editPost);

// DELETE






module.exports = userRouter;

