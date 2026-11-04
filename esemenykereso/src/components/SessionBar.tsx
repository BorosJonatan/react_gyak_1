import { Link } from 'react-router'
import { useSessionStore } from '../stores/sessionStore'

function SessionBar() {
  const user = useSessionStore((state) => state.user)
  const logout = useSessionStore((state) => state.logout)

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <Link to="/events" className="font-semibold text-slate-900">
          Eseménykereső
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-700">
              Bejelentkezve: <strong>{user.name}</strong>
            </span>

            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
            >
              Kijelentkezés
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            Bejelentkezés
          </Link>
        )}
      </div>
    </header>
  )
}

export default SessionBar