import {defineArrayMember, defineField, defineType} from 'sanity'

// Projects / CV entries grouped by year (for example: "2024" or "2020 - 2022")
export const projectYear = defineType({
  name: 'projectYear',
  title: 'Projects Year',
  type: 'document',
  fields: [
    defineField({
      name: 'yearLabel',
      title: 'Year or Year Range',
      type: 'string',
      description: 'Text shown on the Projects page (for example: "2024" or "2020 - 2022").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortYear',
      title: 'Sort Year (Newest First)',
      type: 'number',
      description:
        'Number used only for ordering years newest-to-oldest (for example: 2024, or 2020.5 for "2020 - 2022").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entries',
      title: 'Projects in This Year',
      type: 'array',
      description: 'Drag items up or down to change their order within this year.',
      of: [
        defineArrayMember({
          name: 'projectEntry',
          title: 'Project',
          type: 'object',
          fields: [
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'For example: Director, Photographer, Producer',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Project Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'company',
              title: 'Company / Client (Displayed in Bold)',
              type: 'string',
            }),
            defineField({
              name: 'isFeatured',
              title: 'Top / Featured Project',
              type: 'boolean',
              description:
                'Turn on for Gaga’s proudest projects (shown first before "See all projects"). Pick as many as you want.',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              role: 'role',
              company: 'company',
              isFeatured: 'isFeatured',
            },
            prepare({title, role, company, isFeatured}) {
              const star = isFeatured ? '★ ' : ''
              return {
                title: `${star}${title || 'Untitled Project'}`,
                subtitle: [role, company].filter(Boolean).join(' · '),
              }
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'sortYearDesc',
      by: [{field: 'sortYear', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'yearLabel',
      entries: 'entries',
    },
    prepare({title, entries}) {
      const count = Array.isArray(entries) ? entries.length : 0
      return {
        title: title || 'Year',
        subtitle: `${count} project${count === 1 ? '' : 's'}`,
      }
    },
  },
})
