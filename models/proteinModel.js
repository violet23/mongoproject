const mongoose = require('mongoose');


const proteinSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isPublic: {type: Boolean,required: true},
    proteinName : {type:String,required:true},
    topicBelong: {type:String, required: true},
  });
module.exports = mongoose.model('Protein',proteinSchema);