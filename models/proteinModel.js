const mongoose = require('mongoose');


const proteinSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    proteinName : {type:String,required:true},
    sgdID : {type:String,required:true},
    definition: {type:String, required: true},
    topicList: {type:String, required: true},
    proteinStatisticsTable:[{t: String}],
  });
module.exports = mongoose.model('Protein',proteinSchema);