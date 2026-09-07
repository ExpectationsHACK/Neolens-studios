import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      admin: { description: 'Defaults to the page title if left blank.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: { description: 'Aim for 150-160 characters.' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
