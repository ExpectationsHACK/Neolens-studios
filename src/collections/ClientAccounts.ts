import type { CollectionConfig } from 'payload'
import { isStaff } from '@/access/roles'

/**
 * Login credentials for a contact person at a client company — kept
 * separate from the public-facing `clients` collection (name/logo/
 * testimonial) so a portal login can never leak an email/password hash
 * through the public API that powers /clients.
 */
export const ClientAccounts: CollectionConfig = {
  slug: 'client-accounts',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'client'],
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'The contact person\'s name.' } },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
      saveToJWT: true,
      admin: { description: 'Which company this login can see projects for.' },
    },
  ],
}
