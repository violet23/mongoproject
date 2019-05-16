const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load the configuration
const Config = require('../config.json');

// requiring the samples model
const Sample = require('../models/sampleModel');
const getURL = Config.privateEndpoint;
const imageURL = Config.imageURL;

// load the authentication middleware
//const checkAuth = require('../middleware/checkAuth');

// GET all samples
router.get('/', (req, res, next) =>{
    Sample.find()
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        // console.log(docs);
        const response = {
            count : docs.length,
            sample : docs.map(doc => {
            
            // appending the server prefix to each image
            let newpic = doc.pics.map(item => {
                return {
                  string_pic: imageURL + item.string_pic,
                  subvector_pic : imageURL + item.subvector_pic,
                  subvector_hist : imageURL + item.subvector_hist
                }
              })
              return {
                _id : doc._id,
                sample_id : doc.sample_id,
                topic: doc.topic,
                pics : newpic,
              }
            }),
          }
        res.status(200).json(response);        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });        
    });

});



// export the router
module.exports = router;