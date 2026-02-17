const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

// All chat routes require authentication
router.use(authMiddleware);

// Validation
const validateMessage = [
  body('message').trim().notEmpty(),
  body('conversationId').optional().isUUID()
];

// Routes
router.post('/message', validateMessage, chatController.sendMessage);
router.get('/conversations', chatController.getConversations);
router.get('/conversations/:id', chatController.getConversation);
router.delete('/conversations/:id', chatController.deleteConversation);
router.get('/conversations/:id/messages', chatController.getMessages);

module.exports = router;
