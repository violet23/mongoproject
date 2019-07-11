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
            
              let newtesProfiles = doc.tesProfiles.map(item => {
                return{
                    heatmap3category: item.heatmap3category,
                    averagePlot: item.averagePlot,
                    heatmap : item.heatmap,
                    heatmap3categoryBar: item.heatmap3categoryBar
               }
              });
              let newtssProfiles = doc.tssProfiles.map(item => {
                return{
                    heatmap3category: item.heatmap3category,
                    averagePlot: item.averagePlot,
                    heatmap : item.heatmap,
                    heatmap3categoryBar: item.heatmap3categoryBar
               }
              });
              
              let newbindingRegionProfiles = doc.bindingRegionProfiles.map(item => {
                return{
                    heatmap3category: item.heatmap3category,
                    averagePlot: item.averagePlot,
                    heatmap : item.heatmap,
                    heatmap3categoryBar: item.heatmap3categoryBar
               }
              })
                         
              return {
                _id : doc._id,
                proteinName : doc.proteinName,
                definition : doc.definition,
                tesProfiles: newtesProfiles,
                bindingRegionProfiles: newbindingRegionProfiles,
                proteinStatisticsTable: doc.proteinStatisticsTable,
                alias :doc.alias,
                topicList: doc.topicList,
                tssProfiles: newtssProfiles

                
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
                        
              let newtesProfiles = doc.tesProfiles.map(item => {
                return{
                    heatmap3category: item.heatmap3category,
                    averagePlot: item.averagePlot,
                    heatmap : item.heatmap,
                    heatmap3categoryBar: item.heatmap3categoryBar
               }
              });
              let newtssProfiles = doc.tssProfiles.map(item => {
                return{
                    heatmap3category: item.heatmap3category,
                    averagePlot: item.averagePlot,
                    heatmap : item.heatmap,
                    heatmap3categoryBar: item.heatmap3categoryBar
               }
              });
              
              let newbindingRegionProfiles = doc.bindingRegionProfiles.map(item => {
                return{
                    heatmap3category: item.heatmap3category,
                    averagePlot: item.averagePlot,
                    heatmap : item.heatmap,
                    heatmap3categoryBar: item.heatmap3categoryBar
               }
              })
                         
              return {
                _id : doc._id,
                proteinName : doc.proteinName,
                definition : doc.definition,
                tesProfiles: newtesProfiles,
                bindingRegionProfiles: newbindingRegionProfiles,
                proteinStatisticsTable: doc.proteinStatisticsTable,
                alias :doc.alias,
                topicList: doc.topicList,
                tssProfiles: newtssProfiles

                
              }
          })
      })}
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