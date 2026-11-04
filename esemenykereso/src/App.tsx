import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePages'
import EventsPage from './pages/EventsPages'
import EventDetailsPage from './pages/EventDetailsPage'
import NewEventPage from './pages/NewEventPage'
import EditEventPage from './pages/EditEventPage'
import LoginPage from './pages/LoginPage'
import SessionBar from './components/SessionBar'
import RequireLogin from './components/RequireLogin'

function App() {
  return (
    <>
      <SessionBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/events/new"
          element={
            <RequireLogin>
              <NewEventPage />
            </RequireLogin>
          }
     />
        <Route path="/events/:id/edit" element={<RequireLogin><EditEventPage /></RequireLogin>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App