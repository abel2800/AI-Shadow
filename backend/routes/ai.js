import express from 'express'
import {
  sendMessage,
  getUserChats,
  getChat,
  deleteChat,
  updateChat,
  searchChats,
} from '../controllers/aiController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All AI routes require authentication
router.use(authenticateToken)

// Chat routes
router.post('/chat', sendMessage)
router.get('/chats', getUserChats)
router.get('/chats/search', searchChats)
router.get('/chats/:chatId', getChat)
router.put('/chats/:chatId', updateChat)
router.delete('/chats/:chatId', deleteChat)

export default router

