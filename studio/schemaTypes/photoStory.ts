import {createGallerySchema} from './sharedGalleryFields'

// Photo Stories shown on the second photography page (for example: "One-Day Walk in Snow")
export const photoStory = createGallerySchema({
  schemaName: 'photoStory',
  singularTitle: 'Photo Story',
})
