const jwt = require('jsonwebtoken');
require("dotenv").config()
const Users = require('../models/users');



const authMiddleware = async ( req, res, next )=>{

    try{
       
        
        if(req.headers.cookie){
            
            let token  = req.headers.cookie.split('token=')[1]
            // console.log(decoded);
            const decoded =jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decoded);
            req.adminId = decoded.adminId ? decoded.adminId : decoded.userId;
            const user = await Users.findById(req.adminId)
            if(user.role === 'admin')
            {
            next();
            }
            else
            {
            res.redirect('/admin');
            }
            
            // console.log("admin_authorised");
            
v
        }else{
            const locals = {
                header : "ADMIN LOG IN",
                title: "Sign In",
                description: "Blog created NodeJS & Express"
            }
            res.render('mainIndex/login', {locals});
        }
    }catch(error)
    {
        res.status(401).json( {message: 'Unauthorized'} );
    }
}

module.exports = {authMiddleware}