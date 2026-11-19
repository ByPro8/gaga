import {createGallerySchema} from './sharedGalleryFields'

// Photo Albums shown on the main Photography page
export const album = createGallerySchema({
  schemaName: 'album',
  singularTitle: 'Photo Album',
})
