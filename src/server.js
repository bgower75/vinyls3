require('dotenv').config({silent: true}); //this allows the app to continue running if it can't find the env file
const server = require('./api');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
       
        //error handlers ie 404
        logger.info("We've reached the database");
        server.listen(process.env.PORT, () => {
            logger.info(`Listening to server on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        logger.error(`The error is ${err}`);
    });