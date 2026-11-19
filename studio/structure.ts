import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'
import {SlideshowManager} from './components/SlideshowManager'

// Left-hand sidebar menu shown inside Gaga's Admin Dashboard
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Gagalens Admin')
    .items([
      S.listItem()
        .title('Site Settings (Home, About, Contact & Grids)')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'album',
        title: 'Photo Albums',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'photoStory',
        title: 'Photo Stories',
        S,
        context,
      }),
      S.listItem()
        .title('Slideshow')
        .id('slideshowManager')
        .child(S.component(SlideshowManager).id('slideshowManagerView').title('Slideshow Photos')),
      orderableDocumentListDeskItem({
        type: 'video',
        title: 'Videos',
        S,
        context,
      }),
      S.listItem()
        .title('Projects')
        .schemaType('projectYear')
        .child(
          S.documentTypeList('projectYear')
            .title('Projects')
            .defaultOrdering([{field: 'sortYear', direction: 'desc'}]),
        ),
    ])
