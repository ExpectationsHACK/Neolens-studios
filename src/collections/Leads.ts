import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '@/access/roles'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'projectType', 'budgetBand', 'status', 'createdAt'],
  },
  access: {
    // The public contact form creates leads anonymously — spam is filtered
    // at the application layer (honeypot + Turnstile + rate limit in
    // src/app/(site)/contact/actions.ts), not here. Reading/editing the
    // dashboard requires staff; only admins can permanently delete a lead.
    read: isStaff,
    create: () => true,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'projectType',
      type: 'select',
      options: [
        { label: 'Documentary', value: 'documentary' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Corporate Video', value: 'corporate' },
        { label: 'Live Production', value: 'live-production' },
        { label: 'Brand Content', value: 'brand-content' },
        { label: 'Video Podcast', value: 'video-podcast' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'budgetBand',
      type: 'select',
      options: [
        { label: 'Under ₦1,000,000', value: 'under-1m' },
        { label: '₦1,000,000 – ₦5,000,000', value: '1m-5m' },
        { label: '₦5,000,000 – ₦15,000,000', value: '5m-15m' },
        { label: 'Above ₦15,000,000', value: 'above-15m' },
        { label: 'Not sure yet', value: 'not-sure' },
      ],
    },
    {
      name: 'timeline',
      type: 'select',
      options: [
        { label: 'ASAP', value: 'asap' },
        { label: 'Within 1 month', value: '1-month' },
        { label: '1–3 months', value: '1-3-months' },
        { label: 'Just exploring', value: 'exploring' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'brief',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional brief/deck uploaded by the prospect.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: { position: 'sidebar' },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { position: 'sidebar', description: 'Used for spam rate-limiting only.', readOnly: true },
    },
  ],
}
