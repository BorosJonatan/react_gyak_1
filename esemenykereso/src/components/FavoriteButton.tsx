import { useFavoritesStore } from '../stores/favoritesStore'

type FavoriteButtonProps = {
  eventId: string
}

function FavoriteButton({ eventId }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(eventId)
  )

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  )

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(eventId)}
      aria-pressed={isFavorite}
      className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
    >
      {isFavorite ? '★ Kedvencek között' : '☆ Kedvencekhez adás'}
    </button>
  )
}

export default FavoriteButton