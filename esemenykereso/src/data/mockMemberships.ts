import type { Role } from '../types/Role'
import type { Permission } from '../types/Permission'

type Membership = {
  userName: string
  eventId: string
  role: Role
  permissions?: Permission[]
}

export const mockMemberships: Membership[] = [
  {
    userName: 'Jonatán',
    eventId: '1',
    role: 'fo_szervezo',
  },
  {
    userName: 'Jonatán',
    eventId: '2',
    role: 'resztvevo',
  },
  {
    userName: 'Anna',
    eventId: '1',
    role: 'vezeto',
  },
  {
    userName: 'Anna',
    eventId: '2',
    role: 'fo_szervezo',
  },
  {
    userName: 'Péter',
    eventId: '1',
    role: 'segito',
    permissions: ['edit_event'],
  },
]

export function getEventRole(
    userName: string,
    eventId: string
): Role | null {
  const membership = mockMemberships.find(
    (item) => item.userName === userName && item.eventId === eventId
  )

  return membership?.role ?? null
}

export function getEventMembership(
  userName: string,
  eventId: string
): Membership | null {
  return mockMemberships.find(
    (item) => item.userName === userName && item.eventId === eventId
  ) ?? null
}