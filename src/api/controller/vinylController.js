const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router;
const controller = new Router();
const logger = require('../../utils/logger');

const vinylSchema = require('../schema/vinyl');
const Vinyl = mongoose.model("Vinyl", vinylSchema);

//Get all vinyls
controller.get('/', async (req, res) => {
    let foundVinyls = [];
    const query = req.params.artist;
    try {
        if(req.query.length >0) {
            foundVinyls = await Vinyl.find({artist: query});
            // console.log(foundVinyls);
        }else{
            foundVinyls = await Vinyl.find();
        }
        if(foundVinyls.length === 0) {
            logger.error('No vinyls found');
            res.status(404).json({
                "message": `No vinyls found`
            });
        }else{
            // res.send(foundVinyls);
            console.log(foundVinyls);
        }
    }
    catch(err) {
        logger.error(`No vinyls found ${err}`);
        res.status(404).json({
            "message": `No vinyls found ${err}`
        });
    }
});

//Get vinyl by ID
controller.get('/id/:id', async (req, res) => {
    try {
        const returnedVinyl = await Vinyl.findById(req.params.id)
        res.send(returnedVinyl)
    }
    catch(err) {
        logger.error(`No vinyl found with id ${req.params.id} ${err}`);
        res.status(404).json({
            "message": `No vinyl found with id ${req.params.id} ${err}`
        });
    }
});

//create a vinyl
controller.post('/', (req, res) => {
    const newVinyl = new Vinyl({
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre
    });
    newVinyl.validate((err) => {
        if(err) {
            logger.err(`Wrong format to create new vinyl ${err}`);
            res.status(400).json({
                "message": `Wrong format to creat a new vinyl ${err}`
            });
        }else{
            newVinyl.save();
            res.status(200).send(newVinyl);
        }
    });
});

//delete a vinyl
controller.delete('/id/:id', async (req, res) => {
    try {
        const foundVinyl = await Vinyl.findByIdAndDelete(req.params.id);
        logger.info(`vinyl ${foundVinyl} found and deleted`);
        res.status(200).json({
            "message": `vinyl ${foundVinyl} deleted`
        });
    }
    catch(err) {
        logger.error(`vinyl with id ${req.params.id} not found`);
        res.status(404).json({
            "message": `vinyl with id ${req.params.id} not found`
        });
    }
});

//update a vinyl
controller.put('/id/:id', async (req, res) => {
    const foundVinyl = await Vinyl.findById(req.params.id);
    foundVinyl.name = req.body.name || foundVinyl.name;
    foundVinyl.artist = req.body.artist || foundVinyl.artist;
    foundVinyl.year = req.body.year || foundVinyl.year;
    foundVinyl.genre = req.body.genre || foundVinyl.genre;

    try {
        foundVinyl.validate((err)  => {
            if(err) {
                logger.error(`Wrong format to update a vinyl`);
                res.status(400).json({
                    "message": `wrong format to update a vinyl`
                });
            }else{
                foundVinyl.save()
                res.send(foundVinyl)
            }
        });
    }
    catch (err) {
        logger.error(`No vinyl with id ${req.params.id} found`);
        res.status(404).json({
            "message": `No vinyl with id ${req.params.id} found`
        });
    }
});

module.exports = controller;
