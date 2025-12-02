import api from './axios'

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },
  
  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data)
    return response.data
  },
}

// AI Chat API calls
export const chatAPI = {
  sendMessage: async (data) => {
    const response = await api.post('/ai/chat', data)
    return response.data
  },
  
  getChatHistory: async (params = {}) => {
    const response = await api.get('/ai/chats', { params })
    return response.data
  },
  
  getChat: async (chatId) => {
    const response = await api.get(`/ai/chats/${chatId}`)
    return response.data
  },
  
  updateChat: async (chatId, data) => {
    const response = await api.put(`/ai/chats/${chatId}`, data)
    return response.data
  },
  
  deleteChat: async (chatId) => {
    const response = await api.delete(`/ai/chats/${chatId}`)
    return response.data
  },
  
  searchChats: async (query) => {
    const response = await api.get('/ai/chats/search', { params: { query } })
    return response.data
  },
}

// Prompt Templates API calls
export const promptAPI = {
  getTemplates: async (category) => {
    const response = await api.get('/prompts', { params: { category } })
    return response.data
  },
  
  createTemplate: async (data) => {
    const response = await api.post('/prompts', data)
    return response.data
  },
  
  updateTemplate: async (templateId, data) => {
    const response = await api.put(`/prompts/${templateId}`, data)
    return response.data
  },
  
  deleteTemplate: async (templateId) => {
    const response = await api.delete(`/prompts/${templateId}`)
    return response.data
  },
  
  useTemplate: async (templateId) => {
    const response = await api.post(`/prompts/${templateId}/use`)
    return response.data
  },
}

