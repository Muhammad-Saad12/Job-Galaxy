const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobPostingController');
const applyJob=require('../controllers/jobApply');
const middleware=require('../controllers/userController')
const multer = require('multer');


// Route for creating a job posting
router.post('/employees',middleware.authMiddleware(['employer']), jobController.postJob);

// Route for fetching all job postings
router.get('/viewjobs' ,middleware.authMiddleware(['student']),jobController.getJobPostings);

//Search job postings
router.get('/searchjob/:keyword', middleware.authMiddleware(['student']), jobController.searchJob);

// Route for applying for a job
router.post('/applyjob', applyJob.upload.array('resume'),middleware.authMiddleware(['student']), applyJob.createJobApplication);

// Route for fetching all job applications
router.get('/viewjobapplications', applyJob.getAllJobApplications );


module.exports = router;