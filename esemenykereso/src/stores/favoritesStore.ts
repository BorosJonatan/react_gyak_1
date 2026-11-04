import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavoritesStore = {
  favoriteIds: string[]
  toggleFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
  (set) => ({
      favoriteIds: [],
    
      toggleFavorite: (id) =>
        set((state) => {
          const isFavorite = state.favoriteIds.includes(id)
    
          return {
            favoriteIds: isFavorite
              ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
              : [...state.favoriteIds, id],
          }
      }),
      removeFavorite: (id) =>
      set((state) => ({
        favoriteIds: state.favoriteIds.filter(
          (favoriteId) => favoriteId !== id
        ),
      })),
    }),
    {
      name: 'esemenykereso-favorites',
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
    }),
  }
  )
)