import { Link, useNavigate, useParams } from 'react-router'
import { deleteEvent, getEventById } from '../api/eventsApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import FavoriteButton from '../components/FavoriteButton'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useSessionStore } from '../stores/sessionStore'
import { getEventMembership } from '../data/mockMemberships'
import { can } from '../utils/permissions'

const roleLabels = {
  fo_szervezo: 'Főszervező',
  vezeto: 'Vezető',
  segito: 'Segítő',
  resztvevo: 'Résztvevő',
}

function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useSessionStore((state) => state.user)


  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  )

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['event', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Hiányzik az esemény azonosítója.')
      }
  
      return getEventById(id)
    },
    enabled: Boolean(id),
  })

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
  })

  async function handleDelete(eventId: string) {
    if (!canDelete) {
      return
    }
    const confirmed = window.confirm(
      'Biztosan törölni szeretnéd ezt az eseményt?'
    )
  
    if (!confirmed) {
      return
    }
  
    try {
      await deleteEventMutation.mutateAsync(eventId)
  
      removeFavorite(eventId)

      queryClient.setQueryData(['event', eventId], null)
  
      void queryClient.invalidateQueries({
        queryKey: ['events'],
      })
  
      navigate('/events')
    } catch {
      // A hibát lent, a JSX-ben jelenítjük meg.
    }
  }

  const membership = user && event
    ? getEventMembership(user.name, event.id)
    : null

  const role = membership?.role ?? null

  const canEdit = can(membership, 'edit_event')
  const canDelete = can(membership, 'delete_event')

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/events"
          className="text-blue-700 underline"
        >
          ← Vissza az eseményekhez
        </Link>

        {isLoading && (
          <p className="mt-6">Esemény betöltése...</p>
        )}

        {isError && (
          <p className="mt-6 text-red-700">{isError}</p>
        )}

        {!isLoading && !isError && !event && (
          <p className="mt-6">Az esemény nem található.</p>
        )}

        {!isLoading && !isError && event && (
          <article className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-bold">
              {event.title}
            </h1>

            <p className="mt-4 text-slate-600">
              Helyszín: {event.location}
            </p>

            <p className="mt-2 text-slate-600">
              Dátum: {event.startDate}
            </p>

            <h2 className="mt-6 text-xl font-semibold">
              Az eseményről
            </h2>

            <p className="mt-2">{event.description}</p>

            {user && (
              <p className="mt-4 text-sm text-slate-600">
                Szerepköröd ezen az eseményen:{' '}
                <strong>{role ? roleLabels[role] : 'Nincs tagság'}</strong>
              </p>
            )}

            {canEdit && (
              <Link
                to={`/events/${encodeURIComponent(event.id)}/edit`}
                className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
              >
                Esemény szerkesztése
              </Link>
            )}

            {canDelete && (
              <button
                type="button"
                onClick={() => handleDelete(event.id)}
                disabled={deleteEventMutation.isPending}
                className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800 disabled:opacity-50"
              >
                {deleteEventMutation.isPending
                  ? 'Törlés...'
                  : 'Esemény törlése'}
              </button>
            )}

            <div className="mt-6">
              <FavoriteButton eventId={event.id} />
            </div>


          </article>
        )}
      </div>
    </main>
  )
}

export default EventDetailsPage