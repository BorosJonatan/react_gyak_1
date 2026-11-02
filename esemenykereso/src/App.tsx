import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePages'
import EventsPage from './pages/EventsPages'
import EventDetailsPage from './pages/EventDetailsPage'
import NewEventPage from './pages/NewEventPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/events/new" element={<NewEventPage />} />
    </Routes>
  )
}

export default App