import { useEffect, useState } from 'react'
import {Link} from 'react-router'
import { getEvents } from '../api/eventsApi'
import EventCard from '../components/EventCard'
import { useQuery } from '@tanstack/react-query'
import { useFavoritesStore } from '../stores/favoritesStore'

function EventsPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
  
    return () => {
      clearTimeout(timeoutId)
    }
  }, [search])

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['events', debouncedSearch],
    queryFn: () => getEvents(debouncedSearch),
  })

  const favoriteCount = useFavoritesStore(
    (state) => state.favoriteIds.length
  )

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold">Események</h1>
        <label htmlFor="event-search" className="mt-6 block font-medium">
          Esemény keresése
        </label>

        <input
          id="event-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Írd be az esemény nevét..."
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2"
        />
        <div className="flex">
          <Link
            to="/events/new"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            Új esemény létrehozása
        </Link>
        
        {favoriteCount > 0 &&(
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-100 mt-4 ml-2 px-3 py-2 text-sm font-medium text-amber-900">
            <span aria-hidden="true">★</span>
            <span>Kedvencek: {favoriteCount}</span>
          </div>
        )}

        </div>
        

        {isLoading && (
          <p className="mt-6">Események betöltése...</p>
        )}

        {isError && (
          <p className="mt-6 text-red-700">
            Nem sikerült betölteni az eseményeket.
          </p>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <p className="mt-6">
            Nincs megjeleníthető esemény vagy keresési találat.
          </p>
        )}

        {!isLoading && !isError && events.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        <Link
          to="/"
          className="mt-6 inline-block text-blue-700 underline"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </main>

  )
}

export default EventsPage