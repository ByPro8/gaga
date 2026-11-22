import {createGallerySchema} from './sharedGalleryFields'

// Photo Stories shown on the second photography page (kept separate from the main Slideshow)
export const photoStory = createGallerySchema({
  schemaName: 'photoStory',
  singularTitle: 'Photo Story',
  enableSlideshow: false,
})
