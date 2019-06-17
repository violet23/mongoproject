const mongoose = require('mongoose');


const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topicID: {type:String, required: true},
    proteinList : [{type:String,required:true}],
    topicStatisticsTable:[
      [{type:String,required:true}]
    ],
    /*ProfilesaroundBinding:[{
      topic_B : String,
      protein_B : String
    }],*/

  });
module.exports = mongoose.model('Topic',topicSchema);