const jwt = require('jsonwebtoken');
require("dotenv").config()

const authMiddleware = async ( req, res, next )=>{
    try{
        
        if(req.headers.cookie){
            let token  = req.headers.cookie.split('token=')[1]
            const decoded =jwt.verify(token,process.env.JWT_SECRET);
            req.adminId = decoded.adminId ? decoded.adminId : decoded.userId;
            const user = await Users.findById(req.userId)
            if(user.role === 'user')
            {
            next();
            }
            else
            {
            res.redirect('/signIn');
            }
        }else{
            const locals = {
                header : "LOG IN",
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

module.exports = {authMiddleware} ;