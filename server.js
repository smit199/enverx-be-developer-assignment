const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

// To globally handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({path: './config.env'});

// connecting database
mongoose.connect(process.env.DATABASE)
.then(() => console.log('connected with database'))
.catch(err => {
    console.log(err);
    process.exit(1);
});

// starting server
const server = app.listen(process.env.PORT, () => {
    console.log(`Application is running on port ${process.env.PORT}`);
});

// To globally handle any unhandled or rejected promises
process.on('unhandledRejection', err => {
    console.log(err);
    server.close(() => process.exit(1));  
});