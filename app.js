const express = require('express');
require('dotenv').config();
// const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const connectDB = require('./controllers/config/db');
const path = require('path');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const app = express();
const nocache = require("nocache")

// Connect to the database
connectDB();

// Middleware setup
app.use(nocache());
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/auth/css', express.static(path.join(__dirname, 'auth/css')));

// Setting the view engine to EJS
app.set('view engine', 'ejs');



app.use('/', userRouter)
app.use('/', adminRouter)



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
