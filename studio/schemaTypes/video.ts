import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
import {VimeoUrlInput} from '../components/VimeoUrlInput'

// Videos shown on the Videography page (hosted on Vimeo, managed here)
export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fieldsets: [
    {
      name: 'advancedVimeo',
      title: 'Auto-filled Vimeo Details (Advanced)',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    // Hidden field managed automatically when Gaga drags videos up/down in the list
    orderRankField({type: 'video', newItemPosition: 'before'}),
    defineField({
      name: 'vimeoUrl',
      title: 'Paste Vimeo Link',
      type: 'string',
      description:
        'Paste any Vimeo link here and click "Auto-fill from Vimeo" to fill in the ID, embed link, title, and thumbnail automatically.',
      components: {
        input: VimeoUrlInput,
      },
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
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
      name: 'aspectRatio',
      title: 'Aspect Ratio (Optional)',
      type: 'string',
      description: 'Auto-detected from Vimeo. Leave as 16/9 unless this video has a special shape.',
      initialValue: '16/9',
    }),
    // --- Auto-filled fields (collapsed by default so Gaga rarely needs to edit them) ---
    defineField({
      name: 'vimeoId',
      title: 'Vimeo Video ID',
      type: 'string',
      fieldset: 'advancedVimeo',
      description: 'Filled automatically from the Vimeo link above.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Vimeo Embed Link',
      type: 'url',
      fieldset: 'advancedVimeo',
      description: 'Filled automatically from the Vimeo link above.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vimeoThumbnailUrl',
      title: 'Vimeo Automatic Thumbnail Link (Fallback)',
      type: 'url',
      fieldset: 'advancedVimeo',
      description: 'Used automatically if no Custom Cover Image is uploaded above.',
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
