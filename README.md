Overview
This project is a web application built using Express.js, a minimal and flexible Node.js web application framework. The application uses EJS as its templating engine and follows the MVC (Model-View-Controller) pattern.

Features

# NoCache: Middleware to disable client-side caching.
# Cookie Parser: Middleware to parse cookies.
# Body Parsing: JSON and URL-encoded data parsing.
# Database Connection: Easily connect to a MongoDB database.
# Static Files: Serve static files like CSS, JavaScript, and images.
# EJS Templating: Use EJS as the view engine for rendering HTML.


PROJECT STRUCTURE


├── controllers/
│   └── config/
│       └── db.js           _-- Database connection file_
├── public/                 _-- Static files (CSS, JS, images)_
├── routes
│   ├── user.js             _-- User routes_
│   └── admin.js            _-- Admin routes_
├── views/                  _-- EJS templates_
├── .env                    _-- Environment variables_
├── app.js                  _-- Main application file_
└── package.json            _-- Project dependencies and scripts_


PREREQUISITES

Before you begin, ensure you have the following installed:

    # Node.js
    # MongoDB

=> git clone https://github.com/jesbin2000/Nodejs.git
=> cd Nodejs

Install dependencies:
  # npm install

 Set up environment variables:

=> Create a .env file in the root directory of your project and add the necessary environment variables. 

Example:
    # PORT=3000
    # MONGO_URI=mongodb://localhost:27017/your-database


=> Connect to the database:

    Ensure your MongoDB instance is running and the MONGO_URI in your .env file is correctly set.


RUNNING THE APPLICATION

To start the application, use the following command:
    # npm start
The server should now be running on http://localhost:3000.

ROUTES

# User Routes: Handled in routes/user.js.
# Admin Routes: Handled in routes/admin.js.
