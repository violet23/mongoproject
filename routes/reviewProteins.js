const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load the configuration
const Config = require('../config.json');

// requiring the samples model
const Protein = require('../models/proteinModel');
const getURL = Config.privateEndpoint0;
const imageURL = Config.imageURL;

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
            
            // appending the server prefix to each image
            /*let newtopicStatisticsTable= doc.topicStatisticsTable.map(item => {
                return {
                  Reb1: item.Reb1,
                  Rvb1 : item.Rvb1,
               }
              })*/
                         
              return {
                _id : doc._id,
                proteinName : doc.proteinName,
                sgdID : doc.sgdID,
                topicList: doc.topicList,
                definition: doc.definition,
                proteinStatisticsTable: doc.proteinStatisticsTable,
                //topicTagCountsInSubsectors: doc.topicTagCountsInSubsectors
                
              }
            })
          }
        res.status(200).json(response);        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });        
    });

});

router.get('/:proteinName',  (req, res, next) =>{
  const proteinName=  req.params.proteinName;
  console.log(proteinName);
  Protein.find({'proteinName':proteinName})
  // return results in the reverse sort order of treatments , ascending order on sampleid
  // .select('sampleId standardGeneName assayType')
  .exec()
  .then(docs => {
      console.log("from Database \n",docs);
      // if the document is not null then send the doc
      if (docs.length > 0){
          res.status(200).json({
            protein : docs.map(doc => {
                           
                      return {
                        _id : doc._id,
                        proteinName : doc.proteinName,
                        sgdID : doc.sgdID,
                        topicList: doc.topicList,
                        definition: doc.definition,
                        proteinStatisticsTable: doc.proteinStatisticsTable,
                      }
                  }) 
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