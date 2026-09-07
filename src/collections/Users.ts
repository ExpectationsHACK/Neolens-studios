import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isStaff } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isStaff,
    create: isAdmin,
    update: ({ req, id }) => {
      if (req.user?.collection !== 'users') return false
      if (req.user.role === 'admin') return true
      return req.user.id === id
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      access: {
        // Only an admin can change a user's role — an editor promoting
        // themselves to admin would defeat the whole point of the field.
        update: isAdminField,
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
