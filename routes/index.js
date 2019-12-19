const express = require('express');
const router = express.Router();

// Route files
const bootcamps = require('./bootcamps');
const courses = require('./courses');
const users = require('./users');
const reviews = require('./reviews');
const auth = require('./auth');

// Mount routers
router.use('/api/v1/bootcamps', bootcamps);
router.use('/api/v1/courses', courses);
router.use('/api/v1/users', users);
router.use('/api/v1/reviews', reviews);
router.use('/api/v1/auth', auth);

module.exports = router;
