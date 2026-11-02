import type { Event } from '../types/Event'

const API_URL = 'http://localhost:3000'

export async function getEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/events`)

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni az eseményeket.')
  }

  const events: Event[] = await response.json()

  return events
}