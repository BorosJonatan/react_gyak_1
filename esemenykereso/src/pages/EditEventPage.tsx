import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getEventById, updateEvent } from '../api/eventsApi'
import type { Event, NewEvent } from '../types/Event'

function EditEventPage() {
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
      <div className="mx-auto max-w-2xl">
        <Link to="/events" className="text-blue-700 underline">
          ← Vissza az eseményekhez
        </Link>

        <h1 className="mt-6 text-3xl font-bold">
          Esemény szerkesztése
        </h1>

        {!id && (
          <p className="mt-6 text-red-700">
            Hiányzik az esemény azonosítója.
          </p>
        )}

        {id && isLoading && (
          <p className="mt-6">Esemény betöltése...</p>
        )}

        {id && isError && (
          <p className="mt-6 text-red-700">
            Nem sikerült betölteni az eseményt.
          </p>
        )}

        {id && !isLoading && !isError && !event && (
          <p className="mt-6">Az esemény nem található.</p>
        )}

        {id && !isLoading && !isError && event && (
          <EditEventForm key={event.id} event={event} />
        )}
      </div>
    </main>
  )
}

type EditEventFormProps = {
  event: Event
}

function EditEventForm({ event }: EditEventFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState(event.title)
  const [location, setLocation] = useState(event.location)
  const [startDate, setStartDate] = useState(event.startDate)
  const [description, setDescription] = useState(event.description)

  const [error, setError] = useState<string | null>(null)

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: NewEvent }) =>
      updateEvent(id, data),
  })

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()

    if (!title.trim() || !location.trim() || !startDate || !description.trim()) {
      setError('Kérlek, tölts ki minden mezőt.')
      return
    }

    if (title.trim().length < 5) {
      setError('Az esemény neve legalább 5 karakter legyen.')
      return
    }

    setError(null)

    try {
      const updatedEvent = await updateEventMutation.mutateAsync({
        id: event.id,
        data: {
          title: title.trim(),
          location: location.trim(),
          startDate,
          description: description.trim(),
        },
      })

      queryClient.setQueryData(['event', event.id], updatedEvent)

      void queryClient.invalidateQueries({
        queryKey: ['events'],
      })

      navigate(`/events/${encodeURIComponent(event.id)}`)
    } catch {
      setError('Nem sikerült menteni a módosításokat. Próbáld újra!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5 rounded-xl bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="title" className="block font-medium">
          Esemény neve
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(inputEvent) => setTitle(inputEvent.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="location" className="block font-medium">
          Helyszín
        </label>

        <input
          id="location"
          type="text"
          value={location}
          onChange={(inputEvent) => setLocation(inputEvent.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="startDate" className="block font-medium">
          Kezdő dátum
        </label>

        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(inputEvent) => setStartDate(inputEvent.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Leírás
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(inputEvent) => setDescription(inputEvent.target.value)}
          required
          rows={4}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
        />
      </div>

      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={updateEventMutation.isPending}
        className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {updateEventMutation.isPending
          ? 'Mentés...'
          : 'Módosítások mentése'}
      </button>
    </form>
  )
}

export default EditEventPage