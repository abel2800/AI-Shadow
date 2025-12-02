import express from 'express'
import {
  getPromptTemplates,
  createPromptTemplate,
  updatePromptTemplate,
  deletePromptTemplate,
  usePromptTemplate,
} from '../controllers/promptController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All prompt routes require authentication
router.use(authenticateToken)

router.get('/', getPromptTemplates)
router.post('/', createPromptTemplate)
router.put('/:templateId', updatePromptTemplate)
router.delete('/:templateId', deletePromptTemplate)
router.post('/:templateId/use', usePromptTemplate)

export default router

