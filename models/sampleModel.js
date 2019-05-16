const mongoose = require('mongoose');


const sampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sample_id : {type:Number,required:true},
    topic: {type:String, required: true},
    pics:[{
      string_pic: String, 
      subvector_pic: String,
      subvector_hist : String,
    }],
  });
module.exports = mongoose.model('Sample',sampleSchema);