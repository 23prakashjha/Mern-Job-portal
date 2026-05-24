const express = require('express');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const router = express.Router();

// Apply for a job
router.post('/', [
  body('job').notEmpty().withMessage('Job ID is required'),
  body('resume').notEmpty().withMessage('Resume URL is required'),
  body('coverLetter').optional().isLength({ max: 2000 }).withMessage('Cover letter cannot exceed 2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token required.'
      });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only job seekers can apply for jobs.'
      });
    }

    const { job, resume, coverLetter } = req.body;

    // Check if job exists and is active
    const jobExists = await Job.findById(job);
    if (!jobExists || !jobExists.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or no longer available'
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: job,
      applicant: user._id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const application = await Application.create({
      job: job,
      applicant: user._id,
      recruiter: jobExists.postedBy,
      resume,
      coverLetter
    });

    // Add applicant to job's applicants array
    jobExists.applicants.push({
      user: user._id,
      appliedAt: new Date(),
      resume,
      coverLetter
    });
    await jobExists.save();

    const populatedApplication = await Application.findById(application._id)
      .populate('job', 'title company location')
      .populate('applicant', 'name email')
      .populate('recruiter', 'name email')
      .exec();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application: populatedApplication }
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting application'
    });
  }
});

// Get applications for current user (job seeker)
router.get('/my-applications', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token required.'
      });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only job seekers can view their applications.'
      });
    }

    const applications = await Application.find({ applicant: user._id })
      .populate('job', 'title company location type')
      .populate('recruiter', 'name company')
      .sort({ appliedAt: -1 })
      .exec();

    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// Get applications for jobs posted by current recruiter
router.get('/job-applications', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token required.'
      });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only recruiters can view job applications.'
      });
    }

    const applications = await Application.find({ recruiter: user._id })
      .populate('job', 'title company location')
      .populate('applicant', 'name email phone location skills')
      .sort({ appliedAt: -1 })
      .exec();

    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// Update application status (recruiter only)
router.put('/:id/status', [
  body('status').isIn(['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']).withMessage('Invalid status'),
  body('notes').optional().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token required.'
      });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only recruiters can update application status.'
      });
    }

    const { status, notes } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.recruiter.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update applications for your jobs.'
      });
    }

    // Update status and timestamps
    const updateData = { status, notes };
    const now = new Date();

    switch (status) {
      case 'reviewed':
        updateData.reviewedAt = now;
        break;
      case 'shortlisted':
        updateData.shortlistedAt = now;
        break;
      case 'rejected':
        updateData.rejectedAt = now;
        break;
      case 'hired':
        updateData.hiredAt = now;
        break;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate('job', 'title company')
      .populate('applicant', 'name email')
      .exec();

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: { application: updatedApplication }
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating application status'
    });
  }
});

// Get shortlisted applications (recruiter only)
router.get('/shortlisted', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token required.'
      });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only recruiters can view shortlisted applications.'
      });
    }

    const applications = await Application.find({ 
      recruiter: user._id, 
      status: 'shortlisted' 
    })
      .populate('job', 'title company location')
      .populate('applicant', 'name email phone location skills experience')
      .sort({ shortlistedAt: -1 })
      .exec();

    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    console.error('Get shortlisted applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching shortlisted applications'
    });
  }
});

module.exports = router;
