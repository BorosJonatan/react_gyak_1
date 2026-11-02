import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePages'
import EventsPage from './pages/EventsPages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
    </Routes>
  )
}

export default App