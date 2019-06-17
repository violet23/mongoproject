const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load the configuration
const Config = require('../config.json');

// requiring the samples model
const Topic = require('../models/topicModel');
const getURL = Config.privateEndpoint;
const imageURL = Config.imageURL;

// load the authentication middleware
//const checkAuth = require('../middleware/checkAuth');

// GET all samples
router.get('/', (req, res, next) =>{
    Topic.find()
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        // console.log(docs);
        const response = {
            count : docs.length,
            topics : docs.map(doc => {
            
            // appending the server prefix to each image
            /*let newbindingRegionProfiles= doc.bindingRegionProfiles.map(item => {
                return {
                  topicTable: imageURL + item.topicTable,
                  stringNet : imageURL + item.stringNet,
                  subsector : imageURL + item.subsector,
                  subsector_his : imageURL + item.subsector_his,
               }
              })*/
                         
              return {
                _id : doc._id,
                topicID : doc.topicID,
                proteinList: doc.proteinList,
                topicStatisticsTable: doc.topicStatisticsTable,
                
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

router.get('/:topicID',  (req, res, next) =>{
  const topicID=  req.params.topicID.toUpperCase();
  Topic.find({'topicID':topicID})
  // return results in the reverse sort order of treatments , ascending order on sampleid
  // .select('sampleId standardGeneName assayType')
  .exec()
  .then(docs => {
      console.log("from Database \n",docs);
      // if the document is not null then send the doc
      if (docs.length > 0){
          res.status(200).json({
              topic : docs.map(doc => {
                           
                      return {
                        _id : doc._id,
                        topicID : doc.topicID,
                        proteinList: doc.proteinList,
                        topicStatisticsTable: doc.topicStatisticsTable,
                          // doc: doc
                      }
                  }) ,
          });
      }
      // send the 404 message
      else{
          res.status(404).json({
              message : "Not Found a Valid Entry",
              page : "You display a search page or not found page"
          });
      }                
  }).catch(err => {
      console.log(err);
      res.status(500).json({error: err});
  });
});



// export the router
module.exports = router;