import { create } from 'zustand'

interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  token: string | null
  login: (user: AuthUser, token: string) => void
  logout: () => void
  setUser: (user: AuthUser) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token)
    }
    set({ user, isAuthenticated: true, token })
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
    set({ user: null, isAuthenticated: false, token: null })
  },
  setUser: (user) => set({ user }),
}))
