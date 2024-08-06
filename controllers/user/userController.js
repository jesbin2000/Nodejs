const Post = require('../../models/post');
const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Layout Controller

const mainContentLayout = async (req, res) => {
    const locals = {
        title: "BloggeR",
        description: "Blog created NodeJS & Express"
    }

    let user = null;
    const token = req.cookies.token;
    
    if (token) {
        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await User.findById(decoded.userId).select('username');
        
        } catch (error) {
            console.error('Token verification failed:', error);
        }
    }

    let posts = await Post.find().populate("author", "username");
    posts = posts.reverse();
    res.render('mainIndex/main', { locals,posts,user})
}

const  signUpLayout= (req, res) => {
    const locals = {
        title: "",
        description: "Blog created NodeJS & Express",
        logCheck : true
    }
    res.render('mainIndex/signup', {locals, message:null});
}

const signInLayout = (req, res) => {
    const locals = {
        title: "Sign In",
        description: "Blog created NodeJS & Express",
        header : "LOG IN",
        logCheck : false
    }
    res.render('mainIndex/login', locals );
}

const profileLayout = (req, res) =>{

    const locals = {
        title: "BloggeR",
        description: "Blog created NodeJS & Express"
    }
    res.render('mainIndex/myAccount', {locals,message:null})

}

const addPostLayout = async (req, res) =>{

    try{
        const locals = {
            title: "Add post",
            header :"Add New Post",
            description: "Blog created NodeJS & Express"
        }
    
        res.render('mainIndex/addpost',locals)
    }catch(error){
        res.status(500).json("Internal server error")
    }
    
}

const editPostLayout = async (req, res) =>{
    const locals = {
        title: "Add post",
        header :"Edit Post",
        description: "Blog created NodeJS & Express",
        check:true
    }
    try{
        postId = req.params.id;
        let post = await Post.findOne({_id: postId})
    
        res.render('mainIndex/addpost', {locals,post})

    }catch(error){
        res.status(404).json("Post not found");
    }
    

}

//Profile Controller

const userSignUp = async (req, res) => {
    const locals = {
        title: "signup",
        description: "Blog created NodeJS & Express"
    }

    const {username , password} = req.body;
    console.log(username ,password);
    
    const existingUser = await User.findOne({username});
    if(password==null || username==null ){
        return res.status(404).json({message:'Enter the password & Username '})
    }
    if(existingUser){
        // return res.status(401).json({message: 'username already exist'})
        return res.redirect('/signup')
    }
    const hashPassword = await bcrypt.hash(password,10);
    try{
        const newUser = new User({ username:username, password: hashPassword });
        await newUser.save();
        // res.status(201).json({message:'user created',newUser});
        res.redirect('/signIn');
    }
    catch(error){ 
            res.status(409).json({message : error.message})
    }
}

const usersignIn = async (req, res) => {
    const locals = {
        header :"LOG IN",
        title: "BloggeR",
        description: "Blog created NodeJS & Express"
    };

    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('mainIndex/login', { locals, message: 'Please enter both username and password' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('mainIndex/login', { locals, message: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('mainIndex/login', { locals, message: 'Incorrect password' });
        }

        let posts = await Post.find().populate("author", "username");
        posts = posts.reverse();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        req.userId = user._id;
        res.cookie('token', token, { httpOnly: true }).render('mainIndex/main', { posts, locals, message: null,user});
    } catch (error) {
        console.error(error);
        res.status(500).render('mainIndex/login', { locals, message: 'Internal server error' });
    }
}

const addPost = async (req, res) =>{
    
    const token = req.headers.cookie.split("token=")[1];    

    jwt.verify(token,process.env.JWT_SECRET, async (err,user)=>{
        // console.log(user);
        const { title, body} =req.body;
        const post = new Post({title:title, content:body,author:user.userId})
        await post.save();
        res.redirect('/homePage')
    });

}

const profile = async (req, res )=>{

    const locals = {
        title: "user profile",
        description: "Blog created NodeJS & Express",
        admin : false
    };

    const id = req.params.id;
    // console.log(id);

    let posts = await Post.find({author:id}).populate("author", "username");
    posts = posts.reverse()
    res.render('mainIndex/profile',{locals,posts})

}

const editPost = async(req, res) =>{
    
    const token = req.headers.cookie.split("token=")[1];
    let userId = jwt.verify(token,process.env.JWT_SECRET).userId;
    console.log(userId);
    const {title, body} = req.body;
    await Post.findByIdAndUpdate({_id:postId},{title:title,content:body})
    res.redirect(`/profile/${userId}`)
}

const logOut = (req, res) =>{
        res.clearCookie('token')
        res.redirect('/')
}

const deletePost = async (req, res) =>{
    try{
        const token = req.headers.cookie.split("token=")[1];
        let userId = jwt.verify(token,process.env.JWT_SECRET).userId;
        await Post.deleteOne({_id : req.params.id});
        res.redirect(`/profile/${userId}`);
    }catch(error){
        console.log(error);
    }
}

const viewpost = async(req, res) => {
    const locals ={
        title : "View Post",
        description : "Blog created NodeJS & Express"
    }
    postId = req.params.id;
    let post = await Post.findById(postId).populate("author", "username");
    

    res.render('mainIndex/post',{locals ,post})
}



module.exports = {addPostLayout, addPost, userSignUp,
                usersignIn, signUpLayout, signInLayout,
                mainContentLayout,profileLayout,profile,
                editPostLayout,editPost,logOut,deletePost,
                viewpost}