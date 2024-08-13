const jwt = require('jsonwebtoken');
require("dotenv").config();
const Users = require('../models/users');

const adminMiddleware = async (req, res, next) => {
    try {
        if (req.headers.cookie) {
            let token = req.headers.cookie.split('token=')[1];
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.adminId = decoded.adminId ? decoded.adminId : decoded.userId;

            const user = await Users.findById(req.adminId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.role === 'admin') {
                next();
            } else {
                res.redirect('/admin');
            }
        } else {
            const locals = {
                header: "ADMIN LOG IN",
                title: "Sign In",
                description: "Blog created NodeJS & Express"
            };
            res.render('mainIndex/login', { locals });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { adminMiddleware };
