
const mongoose = require('mongoose');


const sampleSchema = mongoose.Schema({
  _id : {type:Number,required:true},
  protein_contain: [{
    protein1: String,
    protein2: String,
    protein3: String
  }],
  topic: {type:String, required: true},
  string_pic: {type:String, required: true},
  subsector_pic :{type:String, required: true},
  subsector_hist: {type:String, required: true},
  table_data:[{
    protein: [{
      protein1: String,
      protein2: String,
      protein3: String,
    }],
    Z_score: [{
      score1: Number,
      score2: Number,
      score3: Number,
    }],
    Protein_pt_contri: [{
      contri1: Number,
      contri2: Number,
      contri3: Number,
    }],
    peak_tag: [{

    }],
    frac_ppt: [{
      frac1: Number,
      frac2: Number,
      frac3: Number,

    }],
  }],
});

module.exports = mongoose.model('Sample', sampleSchema);