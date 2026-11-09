import type { Permission } from '../types/Permission'
import type { Role } from '../types/Role'

type PermissionMembership = {
  role: Role
  permissions?: Permission[]
}

export function can(
  membership: PermissionMembership | null,
  permission: Permission
): boolean {
  if (!membership) {
    return false
  }

  if (membership.role === 'fo_szervezo') {
    return true
  }

  if (membership.role === 'vezeto') {
    return permission !== 'delete_event'
  }

  if (membership.role === 'segito') {
    return permission !== 'delete_event' &&
      (membership.permissions?.includes(permission) ?? false)
  }

  return false
}