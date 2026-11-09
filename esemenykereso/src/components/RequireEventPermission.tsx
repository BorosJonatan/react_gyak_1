import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'

import { getEventMembership } from '../data/mockMemberships'
import { useSessionStore } from '../stores/sessionStore'
import type { Permission } from '../types/Permission'
import { can } from '../utils/permissions'

type RequireEventPermissionProps = {
  permission: Permission
  children: ReactNode
}

function RequireEventPermission({
  permission,
  children,
}: RequireEventPermissionProps) {
  const { id } = useParams()
  const user = useSessionStore((state) => state.user)

  const membership = user && id
    ? getEventMembership(user.name, id)
    : null

  if (!can(membership, permission)) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">
            Nincs jogosultságod
          </h1>

          <p className="mt-2 text-slate-600">
            Ezt a műveletet nem végezheted el ennél az eseménynél.
          </p>

          <Link
            to="/events"
            className="mt-4 inline-block text-blue-700 underline"
          >
            Vissza az eseményekhez
          </Link>
        </div>
      </main>
    )
  }

  return <>{children}</>
}

export default RequireEventPermission