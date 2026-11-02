import type { Event } from '../types/Event'
import { Link } from 'react-router'

type EventCardProps = {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        {event.title}
      </h2>

      <p className="mt-2 text-slate-600">
        Helyszín: {event.location}
      </p>

      <p className="text-slate-600">
        Dátum: {event.startDate}
      </p>

      <p className="mt-4">
        {event.description}
      </p>

      <Link
        to={`/events/${encodeURIComponent(event.id)}`}
        className="mt-4 inline-block text-blue-700 underline"
      >
        Részletek
      </Link>
    </article>
  )
}

export default EventCard