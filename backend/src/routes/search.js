const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/auth');

// All search routes require authentication
router.use(authMiddleware);

// Validation
const validateSearch = [
  query('q').trim().notEmpty()
];

// Routes
router.get('/', validateSearch, searchController.search);
router.get('/history', searchController.getSearchHistory);
router.delete('/history/:id', searchController.deleteSearchHistory);

module.exports = router;
