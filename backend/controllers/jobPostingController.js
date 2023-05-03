const express = require('express');
const router = express.Router();
const JobPosting = require('../models/JobPosting');

// Route for creating a job posting

const postJob = async (req, res) => {
    try {
        const {jobId, jobTitle, jobDescription, jobTags } = req.body;

        if(!jobId || !jobTitle || !jobDescription || !jobTags){
            return res.status(401).json({ message: 'Please fill all the fields' });
           
        }

        const existingJob = await JobPosting.findOne({ jobId });

        if (existingJob) {
            return res.status(402).json({ message: 'Job already exists' });
            
          }    
    
        const jobPosting = new JobPosting({
            jobId,
          jobTitle,
          jobDescription,
          jobTags,
        });
    
        const savedJobPosting = await jobPosting.save();
    
        res.status(201).json(savedJobPosting);
        console.log(savedJobPosting);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating job posting' });
      }
}

const getJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find();
    
        res.status(200).json(jobPostings);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching job postings' });
      }
}


const searchJob = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const jobs = await JobPosting.find({ jobId: keyword });

    if(!keyword){
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for job' });
  }
}




module.exports ={getJobPostings,postJob,searchJob}
