import { useEffect, useState } from 'react'
import {Link} from 'react-router'

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function loadEvents() {
      try{
        
      }
    }

  }, [])



  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">

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