import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image/video for accessibility and SEO.' },
    },
  ],
  upload: true,
}
