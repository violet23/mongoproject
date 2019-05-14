const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load the configuration 
const Config = require('./config.json');

//get the sample model
const Sample = require('../models/testModel');
const getURL = Config.Endpoint;
const imageURL = Config.imageURL;

//GET all samples
router.get('/', (req,res,next) => {
  Sample.find()
  .exec()
  .then(docs => {
    const response = {
      count : docs.length,
      samples : docs.map(doc => {
        return {
          _id : doc._id,
          protein_contain: doc.protein_contain,
          topic: doc.topic,
          string_pic: imageURL + doc.string_pic,
          subsector_pic: imageURL + doc.subsector_pic,
          subsector_hist: imageURL + doc.subsector_hist,
          table_data: doc.table_data,
          request:{
            type : 'GET',
            URL: getURL + doc._id
          }
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

module.exports = router;