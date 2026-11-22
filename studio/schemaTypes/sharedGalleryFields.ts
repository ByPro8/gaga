import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Shared form template used by BOTH "Photo Albums" and "Photo Stories"
// so they always have the exact same core features (grid size, 2 descriptions,
// drag-and-drop photo ordering, and corner notes).
// Photo Albums also auto-include photos in the Slideshow by default.
export function createGallerySchema(options: {
  schemaName: string
  singularTitle: string
  enableSlideshow?: boolean
}) {
  const enableSlideshow = options.enableSlideshow ?? false

  const photoFields = [
    ...(enableSlideshow
      ? [
          defineField({
            name: 'includeInSlideshow',
            title: 'Include in Slideshow Page',
            type: 'boolean',
            description:
              'On by default for all Photo Albums. Turn off to hide this photo from the random Slideshow.',
            initialValue: true,
          }),
        ]
      : []),
    defineField({
      name: 'cornerNote',
      title: 'Corner Note When Opened (Optional)',
      type: 'string',
      description:
        'Short note shown in the bottom-left corner when a visitor opens this photo or sees it in Slideshow.',
    }),
    defineField({
      name: 'altText',
      title: 'Image Description for Google / Accessibility (Optional)',
      type: 'string',
    }),
  ]

  return defineType({
    name: options.schemaName,
    title: options.singularTitle,
    type: 'document',
    fields: [
      // Hidden field managed automatically when Gaga drags items up/down in the list
      orderRankField({type: options.schemaName, newItemPosition: 'before'}),
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Name shown under the cover photo, at the top of the gallery, and in the URL.',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'years',
        title: 'Year or Years (Optional)',
        type: 'string',
        description: 'Shown under the cover photo (for example: 2015–2026 or 2008).',
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
        description: enableSlideshow
          ? 'Drop multiple photos here to upload at once. Drag thumbnails to change order. All album photos appear in Slideshow automatically unless turned off.'
          : 'Drop multiple photos here to upload at once. Drag thumbnails to change order. Click any photo to add a corner note.',
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
            fields: photoFields,
          }),
        ],
      }),
    ],
    orderings: [
      orderRankOrdering,
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
      },
      prepare({title, years, photos, media}) {
        const photoCount = Array.isArray(photos) ? photos.length : 0
        const parts = [years || null, `${photoCount} photo${photoCount === 1 ? '' : 's'}`].filter(
          Boolean,
        )

        return {
          title: title || 'Untitled',
          subtitle: parts.join(' · '),
          media,
        }
      },
    },
  })
}
