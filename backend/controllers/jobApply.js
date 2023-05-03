const JobApplication = require('../models/JobApplying');
const multer = require('multer');

const createJobApplication = async (req, res) => {
  console.log(req.files);
  try {
    const { jobId, email, coverMessage } = req.body;

    const jobApplication = new JobApplication({
      jobId,
      email,
      resume: req.files.map(file => file.path),
      coverMessage,
    });

    const savedJobApplication = await jobApplication.save();
    console.log(savedJobApplication);

    res.status(201).json({
      success: true,
      message: 'Job application created successfully',
      data: savedJobApplication.toObject(),
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Unable to create job application',
      error: error.message,
    });
  }
};

const getAllJobApplications = async (req, res) => {
  try {
    const jobs = await JobApplication.find();

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job postings' });
  }
};

const storage = multer.diskStorage({
  destination:(req , file , cb)=>{
    cb(null , './resources')
  },
  filename:(req , file , cb)=>{
    cb(null ,Date.now()+file.originalname)
  }
});

const filter = (req , file , cb)=>{
  if(file.mimetype == 'application/pdf'){
    cb(null , true);
  } else {
    cb(new Error("UnSupported file") , false);
  }
};

const upload = multer({
  storage:storage,
  fileFilter:filter,
  limits:1024*1024*10
});

module.exports = {
  createJobApplication,
  getAllJobApplications,
  upload
};
