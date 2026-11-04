import type { Event, NewEvent  } from '../types/Event'

const API_URL = 'http://localhost:3000'

export async function getEvents(search: string): Promise<Event[]> {
  const url = new URL(`${API_URL}/events`)

  if (search.trim() !== '') {
    url.searchParams.set('q', search.trim())
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni az eseményeket.')
  }

  const events: Event[] = await response.json()

  return events
}

export async function getEventById(id: string): Promise<Event | null> {
  const response = await fetch(
    `${API_URL}/events/${encodeURIComponent(id)}`
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni az eseményt.')
  }

  const event: Event = await response.json()

  return event
}

export async function createEvent(data: NewEvent): Promise<Event> {
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      id: crypto.randomUUID(),
    }),
  })

  if (!response.ok) {
    throw new Error('Nem sikerült létrehozni az eseményt.')
  }

  const createdEvent: Event = await response.json()

  return createdEvent
}

export async function updateEvent(
  id: string,
  data: NewEvent
): Promise<Event> {
  const response = await fetch(
    `${API_URL}/events/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error('Nem sikerült módosítani az eseményt.')
  }

  const updatedEvent: Event = await response.json()

  return updatedEvent
}

export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/events/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    }
  )

  if (!response.ok) {
    throw new Error('Nem sikerült törölni az eseményt.')
  }
}