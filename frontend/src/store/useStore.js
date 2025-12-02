import { create } from 'zustand'

// Global state management using Zustand
export const useStore = create((set, get) => ({
  // User state
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, isAuthenticated: false, chats: [], currentChat: null })
  },

  // Chat state
  chats: [],
  currentChat: null,
  
  setChats: (chats) => set({ chats }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
  
  updateChat: (chatId, updates) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    ),
    currentChat: state.currentChat?.id === chatId
      ? { ...state.currentChat, ...updates }
      : state.currentChat,
  })),
  
  deleteChat: (chatId) => set((state) => ({
    chats: state.chats.filter((chat) => chat.id !== chatId),
    currentChat: state.currentChat?.id === chatId ? null : state.currentChat,
  })),

  // Prompt templates
  templates: [],
  setTemplates: (templates) => set({ templates }),
  
  addTemplate: (template) => set((state) => ({
    templates: [...state.templates, template],
  })),
  
  updateTemplate: (templateId, updates) => set((state) => ({
    templates: state.templates.map((template) =>
      template.id === templateId ? { ...template, ...updates } : template
    ),
  })),
  
  deleteTemplate: (templateId) => set((state) => ({
    templates: state.templates.filter((template) => template.id !== templateId),
  })),

  // UI state
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  theme: localStorage.getItem('theme') || 'dark',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    set({ theme })
  },

  // Loading states
  loading: false,
  setLoading: (loading) => set({ loading }),
}))

