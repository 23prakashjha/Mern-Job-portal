const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const Application = require('../models/Application');
const router = express.Router();

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      type,
      experience,
      location,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (experience) filter.experience = experience;
    if (location) filter.location = new RegExp(location, 'i');

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const jobs = await Job.find(filter)
      .populate('postedBy', 'name company')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Job.countDocuments(filter);

    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalJobs: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching jobs'
    });
  }
});

// Get single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name company email')
      .exec();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    res.json({
      success: true,
      data: { job }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job'
    });
  }
});

// Create new job (recruiter only)
router.post('/', [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('type').isIn(['full-time', 'part-time', 'contract', 'internship', 'remote']).withMessage('Invalid job type'),
  body('category').isIn(['engineering', 'design', 'marketing', 'sales', 'support', 'management', 'hr', 'finance', 'other']).withMessage('Invalid category'),
  body('experience').isIn(['entry-level', 'mid-level', 'senior-level', 'executive']).withMessage('Invalid experience level'),
  body('description').trim().notEmpty().withMessage('Job description is required')
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
    const User = require('../models/User');
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only recruiters can post jobs.'
      });
    }

    const jobData = { ...req.body, postedBy: user._id };
    const job = await Job.create(jobData);

    const populatedJob = await Job.findById(job._id)
      .populate('postedBy', 'name company')
      .exec();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: { job: populatedJob }
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating job'
    });
  }
});

// Update job (recruiter only)
router.put('/:id', async (req, res) => {
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
    const User = require('../models/User');
    const user = await User.findById(decoded.id);

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.postedBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only edit your own jobs.'
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postedBy', 'name company');

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: { job: updatedJob }
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating job'
    });
  }
});

// Delete job (recruiter only)
router.delete('/:id', async (req, res) => {
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
    const User = require('../models/User');
    const user = await User.findById(decoded.id);

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.postedBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own jobs.'
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting job'
    });
  }
});

// Get jobs posted by current recruiter
router.get('/my/jobs', async (req, res) => {
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
    const User = require('../models/User');
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only recruiters can view their jobs.'
      });
    }

    const jobs = await Job.find({ postedBy: user._id })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      success: true,
      data: { jobs }
    });
  } catch (error) {
    console.error('Get my jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your jobs'
    });
  }
});

module.exports = router;
