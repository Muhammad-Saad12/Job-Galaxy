const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: [String],
    required: true,
  },
  coverMessage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
