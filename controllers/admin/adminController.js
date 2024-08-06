const Post = require('../../models/post')
const Admin = require('../../models/users')
const User = require('../../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const signInLayout = (req, res) => {
    const locals = {
        title: "Sign In",
        description: "Blog created NodeJS & Express",
        header : "ADMIN LOGIN",
        logCheck : false
    }
    res.render('mainIndex/login', locals );
}


const adminSignIn = async (req, res) => {
    const locals = {
        header:"ADMIN LOG IN",
        title: "Admin Panel",
        description: "Blog created NodeJS & Express"
    };

    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('mainIndex/login', { locals, message: 'Please enter both username and password' });
    }

    try {

        const admin = await Admin.findOne({ username });

        
        if (!Admin) {
            return res.render('mainIndex/login', { locals, message: 'Invalid username' });
        }
        else if(admin.role !== "admin"){
            return res.render('mainIndex/login', { locals, message: `${username} is not an Admin`})
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.render('mainIndex/login', { locals, message: 'Incorrect password' });
        }
        
        let users = await User.find({ role: "user" });

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);
        req.adminId = admin._id;
        let slno = 1;
        res.cookie('token', token, { httpOnly: true }).render('mainIndex/adminPage', { users, locals, message: null,slno,admin});
    } catch (error) {
        console.error(error);
        res.status(500).render('mainIndex/login', { locals, message: 'Internal server error' });
    }
}

const adminPage = async ( req, res) =>{
    const locals = {
        header:"ADMIN LOG IN",
        title: "Admin Panel",
        description: "Blog created NodeJS & Express"
    };
    let token = req.headers.cookie.split("token=")[1];
    let adminId = jwt.verify(token,process.env.JWT_SECRET)
    console.log(adminId);
    let slno = 1;
    const admin = await Admin.findById(adminId.adminId);
    let users = await User.find({ role: "user" });

    res.render('mainIndex/adminPage',{users,admin,message:null,slno })
}

const userPost = async (req, res) => {

    const locals = {
        title: "user profile",
        description: "Blog created NodeJS & Express",
        admin : true
    };
    try{
        const id = req.params.id;    
        let posts = await Post.find({author:id}).populate("author", "username");
        posts = posts.reverse()
        res.render('mainIndex/profile',{locals,posts})
    }
    catch(error){
        console.log(error);
    }
}



const userEditLayout = async (req, res) => {

    const userId = req.params.id;
    const user = await User.findById(userId)
    res.render('mainIndex/editUser', {user})

};

const userEdit = async(req, res) => {
    try {

        const userId = req.params.id;
        const { username, role } = req.body;
        const user = await User.findByIdAndUpdate(userId,{ username, role });

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.redirect('/adminPage')
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

const userDelete = async (req, res) => {

    await Post.deleteOne({_id : req.params.id});
    res.redirect('adminPage')

}


module.exports = {signInLayout,adminSignIn,userPost,
                userEditLayout,userEdit,adminPage,
                userDelete}