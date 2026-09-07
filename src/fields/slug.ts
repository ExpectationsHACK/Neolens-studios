import type { Field } from 'payload'

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `Auto-generated from ${fieldToUse} if left blank.`,
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (value) return value
        const source = data?.[fieldToUse]
        if (typeof source === 'string' && source.length > 0) {
          return source
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
        }
        return value
      },
    ],
  },
})
