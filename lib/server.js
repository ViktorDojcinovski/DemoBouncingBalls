// BASE SETUP
// =============================================================================

// Call dependencies for backend abstraction:
// ...call express
import express from 'express';
// ...define our app using express   
const app = express();

// Use this module for reaching out for the env variables
require('dotenv').config();

// Serve static files from the public directory
app.use(express.static('public'));

//Set express to use ejs as its template language
app.set('view engine', 'ejs');

// Test the backend app with default route
app.get('/', (req, res) => {
  res.render('index', { answer: 42 });
});

//...set dynamic port configuration
const port = process.env.PORT || 8001;

// START THE SERVER
// =============================================================================
const startServer = async (onServerStartCallback) => {
  app.listen(port, onServerStartCallback);
};

startServer(() => {
  console.log(`Magic happens on port ${port}`);
});
