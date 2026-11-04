import { create } from 'zustand'

type SessionUser = {
  name: string
}

type SessionStore = {
  user: SessionUser | null
  login: (name: string) => void
  logout: () => void
}

export const useSessionStore = create<SessionStore>()((set) => ({
  user: null,

  login: (name) =>
    set({
      user: { name },
    }),

  logout: () =>
    set({
      user: null,
    }),
}))