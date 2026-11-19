import {defineArrayMember, defineField, defineType} from 'sanity'

// Shared form template used by BOTH "Photo Albums" and "Photo Stories"
// so they always have the exact same features (grid size, 2 descriptions,
// drag-and-drop photo ordering, corner notes, and slideshow toggle).
export function createGallerySchema(options: {
  schemaName: string
  singularTitle: string
}) {
  return defineType({
    name: options.schemaName,
    title: options.singularTitle,
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Name shown under the cover photo and at the top of the gallery.',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'Web Address (Slug)',
        type: 'slug',
        description: 'Click "Generate" to create a clean URL (for example: manifest-of-nothing).',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'years',
        title: 'Year or Years (Optional)',
        type: 'string',
        description: 'Shown under the cover photo (for example: 2015–2026 or 2008).',
      }),
      defineField({
        name: 'displayOrder',
        title: 'Display Order',
        type: 'number',
        description: 'Controls order on the overview page. Lower numbers appear first (1, 2, 3...).',
        initialValue: 10,
      }),
      defineField({
        name: 'coverImage',
        title: 'Cover Photo',
        type: 'image',
        description:
          'Main preview image on the overview page. Click the crop icon to pick the focal point.',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'photosPerRow',
        title: 'Photos Per Row (Inside This Gallery)',
        type: 'number',
        description: 'Choose how many photos appear side by side when someone opens this gallery.',
        initialValue: 2,
        options: {
          list: [
            {title: '1 photo per row (Large)', value: 1},
            {title: '2 photos per row (Medium)', value: 2},
            {title: '3 photos per row (Compact)', value: 3},
          ],
          layout: 'radio',
        },
      }),
      defineField({
        name: 'mainDescription',
        title: 'Main Description (Optional)',
        type: 'array',
        description: 'Larger main text describing this series. You can bold or italicize words.',
        of: [
          defineArrayMember({
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}],
            lists: [],
            marks: {
              decorators: [
                {title: 'Bold', value: 'strong'},
                {title: 'Italic', value: 'em'},
              ],
            },
          }),
        ],
      }),
      defineField({
        name: 'secondaryNote',
        title: 'Exhibition / Secondary Note (Optional)',
        type: 'text',
        rows: 3,
        description:
          'Smaller secondary text (for example: "First exhibited at the Tbilisi State Academy of Arts, 2008...").',
      }),
      defineField({
        name: 'photos',
        title: 'Photos',
        type: 'array',
        description:
          'Drop multiple photos here to upload at once. Drag thumbnails to change their order. Click any photo to add a corner note or include it in the Slideshow.',
        options: {
          layout: 'grid',
        },
        of: [
          defineArrayMember({
            name: 'galleryPhoto',
            title: 'Photo',
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              defineField({
                name: 'includeInSlideshow',
                title: 'Include in Slideshow Page',
                type: 'boolean',
                description: 'Turn on to include this photo in the random Slideshow.',
                initialValue: false,
              }),
              defineField({
                name: 'cornerNote',
                title: 'Corner Note When Opened (Optional)',
                type: 'string',
                description:
                  'Short note shown in the corner when a visitor clicks to view this photo fullscreen.',
              }),
              defineField({
                name: 'altText',
                title: 'Image Description for Google / Accessibility (Optional)',
                type: 'string',
              }),
            ],
          }),
        ],
      }),
    ],
    orderings: [
      {
        title: 'Display Order',
        name: 'displayOrderAsc',
        by: [{field: 'displayOrder', direction: 'asc'}],
      },
      {
        title: 'Title (A–Z)',
        name: 'titleAsc',
        by: [{field: 'title', direction: 'asc'}],
      },
    ],
    preview: {
      select: {
        title: 'title',
        years: 'years',
        photos: 'photos',
        media: 'coverImage',
        displayOrder: 'displayOrder',
      },
      prepare({title, years, photos, media, displayOrder}) {
        const photoCount = Array.isArray(photos) ? photos.length : 0
        const parts = [
          typeof displayOrder === 'number' ? `#${displayOrder}` : null,
          years || null,
          `${photoCount} photo${photoCount === 1 ? '' : 's'}`,
        ].filter(Boolean)

        return {
          title: title || 'Untitled',
          subtitle: parts.join(' · '),
          media,
        }
      },
    },
  })
}
