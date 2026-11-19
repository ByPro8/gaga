import {defineArrayMember, defineField, defineType} from 'sanity'

// Single settings document for the whole website:
// Home page, About page, Contact text, Social links, Browser Tab, and Page Grid layouts.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'home', title: 'Home & Social Links', default: true},
    {name: 'about', title: 'About Page'},
    {name: 'contact', title: 'Contact Page'},
    {name: 'layouts', title: 'Page Grids & Tab/SEO'},
  ],
  fields: [
    // --- TAB 1: HOME & SOCIAL LINKS ---
    defineField({
      name: 'homeWallpaper',
      title: 'Home Page Wallpaper Photo',
      type: 'image',
      group: 'home',
      description:
        'Upload one high-resolution photo. Our website automatically loads a fast smaller size on small screens and crisp high quality on big screens (2560px+).',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileWallpaper',
      title: 'Mobile Wallpaper Photo (Optional)',
      type: 'image',
      group: 'home',
      description: 'Leave empty to use the main wallpaper automatically on phones.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Link',
      type: 'url',
      group: 'home',
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo Link',
      type: 'url',
      group: 'home',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Link',
      type: 'url',
      group: 'home',
    }),

    // --- TAB 2: ABOUT PAGE ---
    defineField({
      name: 'aboutHeading',
      title: 'About Page Title',
      type: 'string',
      group: 'about',
      initialValue: 'About',
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Gaga’s Profile Photo',
      type: 'image',
      group: 'about',
      description: 'Automatically optimized into a fast WebP photo.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Text',
      type: 'array',
      group: 'about',
      description: 'Use the B button to bold/highlight any words you want.',
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

    // --- TAB 3: CONTACT PAGE ---
    defineField({
      name: 'contactHeading',
      title: 'Contact Page Title',
      type: 'string',
      group: 'contact',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'contactIntroText',
      title: 'Text Encouraging Visitors to Get in Touch',
      type: 'text',
      rows: 4,
      group: 'contact',
      description: 'Shown above the contact form.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Public Contact Email (Optional)',
      type: 'string',
      group: 'contact',
    }),

    // --- TAB 4: PAGE GRIDS & BROWSER TAB / SEO ---
    defineField({
      name: 'albumsPerRow',
      title: 'Photography Page: Albums Per Row',
      type: 'number',
      group: 'layouts',
      initialValue: 2,
      options: {
        list: [
          {title: '1 per row', value: 1},
          {title: '2 per row', value: 2},
          {title: '3 per row', value: 3},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'storiesPerRow',
      title: 'Photo Stories Page: Stories Per Row',
      type: 'number',
      group: 'layouts',
      initialValue: 2,
      options: {
        list: [
          {title: '1 per row', value: 1},
          {title: '2 per row', value: 2},
          {title: '3 per row', value: 3},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'videosPerRow',
      title: 'Videography Page: Videos Per Row',
      type: 'number',
      group: 'layouts',
      initialValue: 3,
      options: {
        list: [
          {title: '3 per row', value: 3},
          {title: '4 per row', value: 4},
          {title: '5 per row', value: 5},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'browserTabTitle',
      title: 'Browser Tab Name',
      type: 'string',
      group: 'layouts',
      initialValue: 'Levan Gaga Kapanadze',
    }),
    defineField({
      name: 'browserTabIcon',
      title: 'Browser Tab Icon (Favicon)',
      type: 'image',
      group: 'layouts',
      description: 'Small square icon shown in the browser tab.',
    }),
    defineField({
      name: 'shareDescription',
      title: 'Website Description (Google & Social Link Previews)',
      type: 'text',
      rows: 3,
      group: 'layouts',
    }),
    defineField({
      name: 'sharePreviewImage',
      title: 'Link Preview Image (WhatsApp / Facebook / Instagram)',
      type: 'image',
      group: 'layouts',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
