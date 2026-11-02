export type Event = {
    id: string
    title: string
    location: string
    startDate: string
    description: string
}

export type NewEvent = Omit<Event, 'id'>