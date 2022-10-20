const mongoose = require('mongoose');

const issueSchema=mongoose.Schema(
  {
    issueName:String,
    issueImage:String,
    issuePdfLink:String,
    indexNumber:String,
    lastActionTime:{
      type:Number,
    }
  }
)

module.exports=mongoose.model('issue',issueSchema)