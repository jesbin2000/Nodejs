const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/users');

const userMiddleware = async (req, res, next) => {
    try {
        if (req.cookies && req.cookies.token) {
            const token = req.cookies.token;
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded.userId){
                
                var user = await User.findById(decoded.userId);
            
            }else{
                user =await User.findById(decoded.adminId)
            }

            if (user && (user.role === 'user' || user.role === 'admin')) {
                next();
            } else {
                res.redirect('/signIn');
            }
        } else {
            const locals = {
                header: "LOG IN",
                title: "Sign In",
                description: "Blog created NodeJS & Express"
            };
            res.render('mainIndex/login', { locals });
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { userMiddleware };
