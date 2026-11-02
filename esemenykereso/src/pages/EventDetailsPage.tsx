import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getEventById } from '../api/eventsApi'
import type { Event } from '../types/Event'
import { useQuery } from '@tanstack/react-query'  

function EventDetailsPage() {
  const { id } = useParams()

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
          </article>
        )}
      </div>
    </main>
  )
}

export default EventDetailsPage