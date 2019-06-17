const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load the configuration
const Config = require('../config.json');

// requiring the samples model
const Protein = require('../models/proteinModel');
const getURL = Config.privateEndpoint0;

// load the authentication middleware
//const checkAuth = require('../middleware/checkAuth');

// GET all samples
router.get('/', (req, res, next) =>{
    Protein.find()
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        // console.log(docs);
        const response = {
            count : docs.length,
            proteins : docs.map(doc => {
              return {
                _id : doc._id,
                isPublic : doc.isPublic,
                proteinName: doc.proteinName,
                topicBelong: doc.topicBelong,
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