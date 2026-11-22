import {useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'

interface SlideshowPhotoItem {
  documentId: string
  baseDocumentId: string
  hasDraft: boolean
  hasPublished: boolean
  galleryTitle: string
  photoKey: string
  imageUrl: string
  cornerNote?: string
}

interface RawAlbumDocument {
  _id: string
  title?: string
  photos?: Array<{
    _key: string
    includeInSlideshow?: boolean
    cornerNote?: string
    imageUrl?: string
  }>
}

// Custom Admin Page inside Sanity Studio:
// Manages the Slideshow across Photo Albums only (Photo Stories stay separate).
// Every new album photo is included automatically; Gaga can exclude any photo with one click
// or restore all album photos back into the Slideshow.
export function SlideshowManager() {
  const sanityClient = useClient({apiVersion: '2025-01-01'})

  const [slideshowPhotos, setSlideshowPhotos] = useState<SlideshowPhotoItem[]>([])
  const [hiddenCount, setHiddenCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isIncludingAll, setIsIncludingAll] = useState(false)
  const [removingKey, setRemovingKey] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadSlideshowPhotos = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const query = `
        *[_type == "album"] | order(orderRank asc) {
          _id,
          title,
          "photos": coalesce(photos[defined(asset)], [])[] {
            _key,
            includeInSlideshow,
            cornerNote,
            "imageUrl": asset->url
          }
        }
      `

      const rawDocuments = await sanityClient.fetch<RawAlbumDocument[]>(query)

      // Group published and draft copies of the same album so photos never appear twice
      const documentsByBaseId = new Map<
        string,
        {draft?: RawAlbumDocument; published?: RawAlbumDocument}
      >()

      for (const doc of rawDocuments) {
        const isDraft = doc._id.startsWith('drafts.')
        const baseId = doc._id.replace(/^drafts\./, '')
        const existing = documentsByBaseId.get(baseId) || {}

        if (isDraft) {
          existing.draft = doc
        } else {
          existing.published = doc
        }

        documentsByBaseId.set(baseId, existing)
      }

      const activePhotos: SlideshowPhotoItem[] = []
      let excludedPhotos = 0

      for (const [baseId, pair] of documentsByBaseId.entries()) {
        const activeDoc = pair.draft || pair.published
        if (!activeDoc || !activeDoc.photos) continue

        for (const photo of activeDoc.photos) {
          if (!photo.imageUrl) continue

          if (photo.includeInSlideshow === false) {
            excludedPhotos += 1
            continue
          }

          activePhotos.push({
            documentId: activeDoc._id,
            baseDocumentId: baseId,
            hasDraft: Boolean(pair.draft),
            hasPublished: Boolean(pair.published),
            galleryTitle: activeDoc.title || 'Untitled',
            photoKey: photo._key,
            imageUrl: photo.imageUrl,
            cornerNote: photo.cornerNote,
          })
        }
      }

      setSlideshowPhotos(activePhotos)
      setHiddenCount(excludedPhotos)
    } catch (error) {
      console.error('Failed to load slideshow photos:', error)
      setErrorMessage('Could not load slideshow photos. Click Refresh to try again.')
    } finally {
      setIsLoading(false)
    }
  }, [sanityClient])

  useEffect(() => {
    loadSlideshowPhotos()
  }, [loadSlideshowPhotos])

  // Turns OFF "includeInSlideshow" on this photo inside its album (does NOT delete the photo)
  const removeFromSlideshow = async (item: SlideshowPhotoItem) => {
    const uniqueRowId = `${item.baseDocumentId}-${item.photoKey}`
    setRemovingKey(uniqueRowId)
    setErrorMessage(null)

    try {
      const fieldPath = `photos[_key=="${item.photoKey}"].includeInSlideshow`
      const idsToUpdate: string[] = []

      if (item.hasPublished) idsToUpdate.push(item.baseDocumentId)
      if (item.hasDraft) idsToUpdate.push(`drafts.${item.baseDocumentId}`)

      await Promise.all(
        idsToUpdate.map((docId) => sanityClient.patch(docId).set({[fieldPath]: false}).commit()),
      )

      setSlideshowPhotos((current) =>
        current.filter(
          (photo) =>
            !(photo.baseDocumentId === item.baseDocumentId && photo.photoKey === item.photoKey),
        ),
      )
      setHiddenCount((count) => count + 1)
    } catch (error) {
      console.error('Failed to remove photo from slideshow:', error)
      setErrorMessage('Could not remove that photo. Please try again.')
    } finally {
      setRemovingKey(null)
    }
  }

  // One-click helper: sets includeInSlideshow = true on every album photo that was previously off
  const includeAllAlbumPhotos = async () => {
    setIsIncludingAll(true)
    setErrorMessage(null)

    try {
      const query = `
        *[_type == "album"] {
          _id,
          "hiddenKeys": coalesce(photos[includeInSlideshow == false]._key, [])
        }
      `
      const docs = await sanityClient.fetch<Array<{_id: string; hiddenKeys: string[]}>>(query)

      for (const doc of docs) {
        if (!doc.hiddenKeys || doc.hiddenKeys.length === 0) continue
        const patchObject: Record<string, boolean> = {}
        for (const key of doc.hiddenKeys) {
          patchObject[`photos[_key=="${key}"].includeInSlideshow`] = true
        }
        await sanityClient.patch(doc._id).set(patchObject).commit()
      }

      await loadSlideshowPhotos()
    } catch (error) {
      console.error('Failed to include all album photos:', error)
      setErrorMessage('Could not include all album photos. Please try again.')
    } finally {
      setIsIncludingAll(false)
    }
  }

  return (
    <div style={{padding: '24px', maxWidth: '1200px', fontFamily: 'sans-serif'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2 style={{margin: 0, fontSize: '20px', fontWeight: 600}}>
            Slideshow Photos ({slideshowPhotos.length})
          </h2>
          <p style={{margin: '6px 0 0', opacity: 0.7, fontSize: '14px'}}>
            All Photo Album images are included automatically (Photo Stories stay separate).
            Removing a photo here only hides it from Slideshow—it stays safe in its album.
          </p>
        </div>

        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={includeAllAlbumPhotos}
              disabled={isIncludingAll || isLoading}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(234, 179, 8, 0.6)',
                background: 'rgba(255, 226, 146, 0.25)',
                color: 'inherit',
                cursor: isIncludingAll ? 'wait' : 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {isIncludingAll
                ? 'Adding all...'
                : `Include All Hidden Album Photos (${hiddenCount})`}
            </button>
          )}

          <button
            type="button"
            onClick={loadSlideshowPhotos}
            disabled={isLoading}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid rgba(128,128,128,0.4)',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '16px',
            borderRadius: '6px',
            background: 'rgba(220, 38, 38, 0.15)',
            color: '#f87171',
            fontSize: '14px',
          }}
        >
          {errorMessage}
        </div>
      )}

      {!isLoading && slideshowPhotos.length === 0 && (
        <div
          style={{
            padding: '40px 24px',
            textAlign: 'center',
            border: '1px dashed rgba(128,128,128,0.4)',
            borderRadius: '8px',
            opacity: 0.75,
          }}
        >
          <p style={{margin: 0, fontSize: '15px'}}>No album photos are in the Slideshow yet.</p>
          <p style={{margin: '8px 0 0', fontSize: '13px'}}>
            Click <strong>Include All Hidden Album Photos</strong> above, or upload photos to any
            Photo Album.
          </p>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {slideshowPhotos.map((item) => {
          const uniqueRowId = `${item.baseDocumentId}-${item.photoKey}`
          const isRemoving = removingKey === uniqueRowId

          return (
            <div
              key={uniqueRowId}
              style={{
                border: '1px solid rgba(128,128,128,0.25)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  aspectRatio: '3 / 2',
                  background: 'rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={`${item.imageUrl}?w=500&auto=format&q=75`}
                  alt={item.cornerNote || item.galleryTitle}
                  style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                />
              </div>

              <div style={{padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                <div style={{fontSize: '13px', fontWeight: 600}}>
                  {item.galleryTitle}
                  {item.hasDraft && !item.hasPublished && (
                    <span style={{marginLeft: '6px', fontSize: '11px', opacity: 0.6}}>(Draft)</span>
                  )}
                </div>
                {item.cornerNote && (
                  <div style={{fontSize: '12px', opacity: 0.65}}>{item.cornerNote}</div>
                )}
                <button
                  type="button"
                  onClick={() => removeFromSlideshow(item)}
                  disabled={isRemoving}
                  style={{
                    marginTop: '4px',
                    padding: '6px 10px',
                    borderRadius: '5px',
                    border: '1px solid rgba(239, 68, 68, 0.45)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    cursor: isRemoving ? 'wait' : 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {isRemoving ? 'Removing...' : 'Remove from Slideshow'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
