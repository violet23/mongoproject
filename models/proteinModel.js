const mongoose = require('mongoose');


const proteinSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    proteinName : {type:String,required:true},
    definition: {type:String, required: true},
    tesProfiles: [{ 
      heatmap3category : [{ layer : String}],
      averagePlot : [{ layer : String}],
      heatmap : [{ layer : String}],
      heatmap3categoryBar:String,
    }],
    bindingRegionProfiles: [{ 
      heatmap3category : [{ layer : String}],
      averagePlot : [{ layer : String}],
      heatmap : [{ layer : String}],
      heatmap3categoryBar:String,
    }],
    proteinStatisticsTable: [{p: String}],
    alias :{type:String, required: true},
    topicList: {type:String, required: true},
    tssProfiles: [{ 
      heatmap3category : [{ layer : String}],
      averagePlot : [{ layer : String}],
      heatmap : [{ layer : String}],
      heatmap3categoryBar:String,
    }],
  });
module.exports = mongoose.model('Protein',proteinSchema);