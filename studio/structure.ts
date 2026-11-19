import type {StructureResolver} from 'sanity/structure'

// Left-hand sidebar menu shown inside Gaga's Admin Dashboard
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gagalens Admin')
    .items([
      S.listItem()
        .title('Site Settings (Home, About, Contact & Grids)')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem()
        .title('Photo Albums')
        .schemaType('album')
        .child(
          S.documentTypeList('album')
            .title('Photo Albums')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Photo Stories')
        .schemaType('photoStory')
        .child(
          S.documentTypeList('photoStory')
            .title('Photo Stories')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Videos')
        .schemaType('video')
        .child(
          S.documentTypeList('video')
            .title('Videos')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Projects')
        .schemaType('projectYear')
        .child(
          S.documentTypeList('projectYear')
            .title('Projects')
            .defaultOrdering([{field: 'sortYear', direction: 'desc'}]),
        ),
    ])
