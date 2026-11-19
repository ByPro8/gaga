import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// Videos shown on the Videography page (hosted on Vimeo, managed here)
export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    // Hidden field managed automatically when Gaga drags videos up/down in the list
    orderRankField({type: 'video', newItemPosition: 'before'}),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vimeoId',
      title: 'Vimeo Video ID',
      type: 'string',
      description: 'The number from the Vimeo link (for example: 1024311415).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Vimeo Embed Link',
      type: 'url',
      description:
        'Full Vimeo player link (for example: https://player.vimeo.com/video/1024311415 or with ?h=... for private videos).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'customCoverImage',
      title: 'Custom Cover Image (Optional)',
      type: 'image',
      description: 'Upload a custom thumbnail if you do not want to use Vimeo’s automatic one.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'vimeoThumbnailUrl',
      title: 'Vimeo Automatic Thumbnail Link (Fallback)',
      type: 'url',
      description: 'Used automatically if no custom cover image is uploaded above.',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio (Optional)',
      type: 'string',
      description: 'Leave as 16:9 unless this video has a special wide or square shape.',
      initialValue: '16/9',
      options: {
        list: [
          {title: '16:9 (Standard Widescreen)', value: '16/9'},
          {title: '256:135 (Cinema)', value: '256/135'},
          {title: '1024:429 (Anamorphic Wide)', value: '1024/429'},
          {title: '96:41 (Ultrawide)', value: '96/41'},
          {title: '64:27 (21:9)', value: '64/27'},
          {title: '8:5', value: '8/5'},
          {title: '1:1 (Square)', value: '1/1'},
        ],
      },
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      vimeoId: 'vimeoId',
      media: 'customCoverImage',
    },
    prepare({title, vimeoId, media}) {
      return {
        title: title || 'Untitled Video',
        subtitle: vimeoId ? `Vimeo ${vimeoId}` : '',
        media,
      }
    },
  },
})
