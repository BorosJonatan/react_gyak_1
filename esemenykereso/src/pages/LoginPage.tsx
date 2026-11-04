import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSessionStore } from '../stores/sessionStore'

function LoginPage() {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const login = useSessionStore((state) => state.login)
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Kérlek, add meg a neved.')
      return
    }

    login(trimmedName)
    navigate('/events')
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-lg">
        <Link to="/events" className="text-blue-700 underline">
          ← Vissza az eseményekhez
        </Link>

        <h1 className="mt-6 text-3xl font-bold">
          Gyakorló bejelentkezés
        </h1>

        <p className="mt-2 text-slate-600">
          Adj meg egy nevet a szimulált bejelentkezéshez.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="name" className="block font-medium">
              Név
            </label>

            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
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
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            Belépés
          </button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage