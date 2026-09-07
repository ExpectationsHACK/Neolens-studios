import type { Access, FieldAccess } from 'payload'

/** Any logged-in staff member (users collection), regardless of role. */
export const isStaff: Access = ({ req }) => Boolean(req.user && req.user.collection === 'users')

/** Logged-in staff member with the admin role specifically. */
export const isAdmin: Access = ({ req }) =>
  Boolean(req.user && req.user.collection === 'users' && req.user.role === 'admin')

export const isAdminField: FieldAccess = ({ req }) =>
  Boolean(req.user && req.user.collection === 'users' && req.user.role === 'admin')

/** Staff, or the client-account whose linked company owns this document. */
export const isStaffOrOwningClient: FieldAccess = ({ req, doc }) => {
  if (req.user?.collection === 'users') return true
  if (req.user?.collection === 'client-accounts') {
    const ownerClientId = typeof doc?.client === 'object' ? doc.client?.id : doc?.client
    return Boolean(ownerClientId) && String(req.user.client) === String(ownerClientId)
  }
  return false
}
