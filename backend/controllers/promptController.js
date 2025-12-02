import pool from '../config/database.js'

// Get all prompt templates
export const getPromptTemplates = async (req, res) => {
  try {
    const userId = req.user.userId
    const { category } = req.query

    let query = `
      SELECT * FROM prompt_templates 
      WHERE (user_id = $1 OR is_public = true)
    `
    const params = [userId]

    if (category) {
      query += ` AND category = $2`
      params.push(category)
    }

    query += ` ORDER BY usage_count DESC, created_at DESC`

    const result = await pool.query(query, params)

    res.json({
      success: true,
      templates: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error('Get templates error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching prompt templates',
      error: error.message,
    })
  }
}

// Create new prompt template
export const createPromptTemplate = async (req, res) => {
  try {
    const userId = req.user.userId
    const { title, description, prompt, category = 'general', is_public = false } = req.body

    if (!title || !prompt) {
      return res.status(400).json({
        success: false,
        message: 'Title and prompt are required',
      })
    }

    const result = await pool.query(
      `INSERT INTO prompt_templates (user_id, title, description, prompt, category, is_public)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, title, description, prompt, category, is_public]
    )

    res.status(201).json({
      success: true,
      message: 'Prompt template created successfully',
      template: result.rows[0],
    })
  } catch (error) {
    console.error('Create template error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating prompt template',
      error: error.message,
    })
  }
}

// Update prompt template
export const updatePromptTemplate = async (req, res) => {
  try {
    const userId = req.user.userId
    const { templateId } = req.params
    const { title, description, prompt, category, is_public } = req.body

    const updates = []
    const values = []
    let paramIndex = 1

    if (title) {
      updates.push(`title = $${paramIndex}`)
      values.push(title)
      paramIndex++
    }

    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`)
      values.push(description)
      paramIndex++
    }

    if (prompt) {
      updates.push(`prompt = $${paramIndex}`)
      values.push(prompt)
      paramIndex++
    }

    if (category) {
      updates.push(`category = $${paramIndex}`)
      values.push(category)
      paramIndex++
    }

    if (is_public !== undefined) {
      updates.push(`is_public = $${paramIndex}`)
      values.push(is_public)
      paramIndex++
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      })
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(templateId, userId)

    const result = await pool.query(
      `UPDATE prompt_templates SET ${updates.join(', ')}
       WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
       RETURNING *`,
      values
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Template not found or access denied',
      })
    }

    res.json({
      success: true,
      message: 'Template updated successfully',
      template: result.rows[0],
    })
  } catch (error) {
    console.error('Update template error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating template',
      error: error.message,
    })
  }
}

// Delete prompt template
export const deletePromptTemplate = async (req, res) => {
  try {
    const userId = req.user.userId
    const { templateId } = req.params

    const result = await pool.query(
      'DELETE FROM prompt_templates WHERE id = $1 AND user_id = $2 RETURNING id',
      [templateId, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Template not found or access denied',
      })
    }

    res.json({
      success: true,
      message: 'Template deleted successfully',
    })
  } catch (error) {
    console.error('Delete template error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting template',
      error: error.message,
    })
  }
}

// Increment usage count
export const usePromptTemplate = async (req, res) => {
  try {
    const { templateId } = req.params

    await pool.query(
      'UPDATE prompt_templates SET usage_count = usage_count + 1 WHERE id = $1',
      [templateId]
    )

    res.json({
      success: true,
      message: 'Usage count updated',
    })
  } catch (error) {
    console.error('Use template error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating usage count',
      error: error.message,
    })
  }
}

