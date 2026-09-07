import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '@/access/roles'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured'],
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    {
      name: 'testimonialQuote',
      type: 'textarea',
      admin: { description: 'Optional client quote shown on /clients.' },
    },
    { name: 'testimonialAuthor', type: 'text' },
    { name: 'testimonialRole', type: 'text' },
    {
      name: 'testimonialVideo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional — shown instead of the text quote on /clients if present.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show in the homepage client strip.' },
    },
  ],
}
