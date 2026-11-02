import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { createEvent } from '../api/eventsApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function NewEventPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const createEventMutation = useMutation({
    mutationFn: createEvent,
  })


  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [description, setDescription] = useState('')

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  
    if (!title.trim() || !location.trim() || !description.trim()) {
      setError('Kérlek, tölts ki minden mezőt.')
      return
    }
  
    if (title.trim().length < 5) {
      setError('Az esemény neve legalább 5 karakter legyen.')
      return
    }
  
    setError(null)
  
    try {
      const createdEvent = await createEventMutation.mutateAsync({
        title: title.trim(),
        location: location.trim(),
        startDate,
        description: description.trim(),
      })
  
      void queryClient.invalidateQueries({ queryKey: ['events'] })
  
      navigate(`/events/${encodeURIComponent(createdEvent.id)}`)
    } catch {
      setError('Nem sikerült menteni az eseményt. Próbáld újra!')
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <Link to="/events" className="text-blue-700 underline">
          ← Vissza az eseményekhez
        </Link>

        <h1 className="mt-6 text-3xl font-bold">
          Új esemény létrehozása
        </h1>

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
              onChange={(event) => setTitle(event.target.value)}
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
              onChange={(event) => setLocation(event.target.value)}
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
              onChange={(event) => setStartDate(event.target.value)}
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
              onChange={(event) => setDescription(event.target.value)}
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
          disabled={createEventMutation.isPending}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {createEventMutation.isPending
            ? 'Mentés...'
            : 'Esemény létrehozása'}
        </button>
        </form>
      </div>
    </main>
  )
}

export default NewEventPage