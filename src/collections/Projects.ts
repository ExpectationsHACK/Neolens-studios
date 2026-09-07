import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seo'
import { isAdmin, isStaff, isStaffOrOwningClient } from '@/access/roles'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'client', 'featured', '_status'],
  },
  versions: {
    drafts: true,
  },
  access: {
    // Staff can read/preview drafts; the public API and portal only ever see
    // published projects (the client portal reads projects by a separate,
    // scoped query — see src/lib/portal.ts — so this only governs the public
    // marketing site and the admin/API surface).
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Documentaries', value: 'documentaries' },
        { label: 'Live Production', value: 'live-production' },
        { label: 'Corporate Events', value: 'corporate-events' },
        { label: 'Brand Content', value: 'brand-content' },
        { label: 'Commercials', value: 'commercials' },
        { label: 'Video Podcast', value: 'video-podcast' },
      ],
    },
    { name: 'client', type: 'relationship', relationTo: 'clients' },
    { name: 'year', type: 'number' },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences shown on the /work grid card.' },
    },
    { name: 'body', type: 'richText' },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Required before the project is shown publicly, but you can draft without one.' },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optimized MP4 for this project (served from R2).' },
    },
    {
      name: 'credits',
      type: 'array',
      fields: [
        { name: 'role', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
    {
      name: 'outcomes',
      type: 'array',
      admin: {
        description:
          'Real, verifiable results shown as stat chips on the project page — e.g. "3.2M views", "Sold out the run". Only add numbers you can stand behind.',
      },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "3.2M"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Views in week one"' } },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show in the homepage featured work section.' },
    },
    {
      name: 'productionStatus',
      type: 'select',
      defaultValue: 'planning',
      admin: {
        position: 'sidebar',
        description: 'Shown to the client in their portal — independent of the public draft/published state above.',
      },
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'In Production', value: 'in-production' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Delivered', value: 'delivered' },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      access: {
        // Only staff or the owning client's portal account can see download
        // links — this field is invisible on the public API even though the
        // rest of the project document is public once published.
        read: isStaffOrOwningClient,
      },
      admin: {
        position: 'sidebar',
        description: 'Files the client can download from their portal.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    seoFields,
  ],
}
