const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    jobId:{
        type:String,
        required:true,
    },

  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobTags: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
