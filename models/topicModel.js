const mongoose = require('mongoose');


const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topicID: {type:String, required: true},
    wigFile : {type: String, required: true},
    topicStatisticsTable:[{p: String}],
    tesProfiles :[{ 
      heatmap3category : [{ layer : String}],
      averagePlot : [{ layer : String}],
      heatmap : [{ layer : String}],
      heatmap3categoryBar:String,
    }],
    topicSubsectorPercentCommonGenesForReferenceSubsectorSpecific :{type:String, required: true},
    topicSubsectorNoCommonGenesSubsectorSpecific : {type:String, required: true},
    topicTagCountsInSubsectors : {type:String, required: true},
    topicSubsectorPercentCommonGenesForReference : {type:String, required: true},
    geneList : {type:String, required: true},
    bindingRegionProfiles : [{ 
      heatmap3category : [{ layer : String}],
      averagePlot : [{ layer : String}],
      heatmap : [{ layer : String}],
      heatmap3categoryBar:String,
    }],
    subsectorPicture : {type:String, required: true},
    proteinList : {type:String, required: true},
    topicSubsectorSignificanceSubsectorSpecific : {type:String, required: true},
    topicSubsectorSignificance : {type:String, required: true},
    topicSubsectorNoCommonGenes : {type:String, required: true},
    topicSubsectorPercentCommonGenesForTopics : {type:String, required: true},
    topicSubsectorPercentCommonGenesForTopicsSubsectorSpecific : {type:String, required: true},
    tssProfiles : [{ 
      heatmap3category : [{ layer : String}],
      averagePlot : [{ layer : String}],
      heatmap : [{ layer : String}],
      heatmap3categoryBar:String,
    }],
    motif : [{"1" :{layer : String}}],
    topicSubsectorResults:[{type:String, required: true}],
    topicSubsectorResultsSubsectorSpecific : [{type:String, required: true}],
    neighborTopicsPlot: [{ layer : String}],

  });
module.exports = mongoose.model('Topic',topicSchema);