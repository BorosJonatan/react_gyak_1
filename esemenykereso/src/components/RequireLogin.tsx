import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useSessionStore } from '../stores/sessionStore'

type RequireLoginProps = {
  children: ReactNode
}

function RequireLogin({ children }: RequireLoginProps) {
  const user = useSessionStore((state) => state.user)

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">
            Bejelentkezés szükséges
          </h1>

          <p className="mt-2 text-slate-600">
            Új esemény létrehozásához először jelentkezz be.
          </p>

          <Link
            to="/login"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            Tovább a bejelentkezéshez
          </Link>
        </div>
      </main>
    )
  }

  return <>{children}</>
}

export default RequireLogin