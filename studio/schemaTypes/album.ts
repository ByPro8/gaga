import {createGallerySchema} from './sharedGalleryFields'

// Photo Albums shown on the main Photography page (auto-included in Slideshow by default)
export const album = createGallerySchema({
  schemaName: 'album',
  singularTitle: 'Photo Album',
  enableSlideshow: true,
})
