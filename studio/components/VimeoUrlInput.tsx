import {useState} from 'react'
import {type StringInputProps, set, unset, useDocumentOperation, useFormValue} from 'sanity'

// Extracts the numeric Vimeo ID and optional private hash from any Vimeo link format:
// - https://vimeo.com/1024311415
// - https://vimeo.com/698679721/6dcd58103b
// - https://player.vimeo.com/video/698679721?h=6dcd58103b
function parseVimeoLink(rawUrl: string): {vimeoId: string; embedUrl: string; oembedUrl: string} | null {
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  try {
    const parsedUrl = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean)

    // Find the numeric video ID in the path (handles /video/12345, /channels/.../12345, /12345/hash)
    const idIndex = pathParts.findIndex((part) => /^\d+$/.test(part))
    if (idIndex === -1) return null

    const vimeoId = pathParts[idIndex]
    const queryHash = parsedUrl.searchParams.get('h')
    const pathHash =
      pathParts[idIndex + 1] && /^[a-zA-Z0-9]+$/.test(pathParts[idIndex + 1])
        ? pathParts[idIndex + 1]
        : null
    const privacyHash = queryHash || pathHash

    const embedUrl = privacyHash
      ? `https://player.vimeo.com/video/${vimeoId}?h=${privacyHash}`
      : `https://player.vimeo.com/video/${vimeoId}`

    const oembedUrl = privacyHash
      ? `https://vimeo.com/${vimeoId}/${privacyHash}`
      : `https://vimeo.com/${vimeoId}`

    return {vimeoId, embedUrl, oembedUrl}
  } catch {
    return null
  }
}

// Simplify width/height into a clean ratio string (e.g. 1920x1080 -> "16/9")
function simplifyAspectRatio(width: number, height: number): string {
  const greatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : greatestCommonDivisor(b, a % b))
  const divisor = greatestCommonDivisor(Math.round(width), Math.round(height))
  return `${Math.round(width / divisor)}/${Math.round(height / divisor)}`
}

export function VimeoUrlInput(props: StringInputProps) {
  const {value = '', onChange} = props

  const rawDocumentId = (useFormValue(['_id']) as string | undefined) || ''
  const publishedId = rawDocumentId.replace(/^drafts\./, '')
  const existingTitle = useFormValue(['title']) as string | undefined
  const {patch} = useDocumentOperation(publishedId, 'video')

  const [isFetching, setIsFetching] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  async function autoFillFromVimeo(linkToUse: string) {
    const parsed = parseVimeoLink(linkToUse)
    if (!parsed) {
      setIsError(true)
      setStatusMessage('Please paste a valid Vimeo link (e.g. https://vimeo.com/1024311415).')
      return
    }

    setIsFetching(true)
    setIsError(false)
    setStatusMessage('Fetching title & thumbnail from Vimeo...')

    const fieldsToUpdate: Record<string, string> = {
      vimeoId: parsed.vimeoId,
      embedUrl: parsed.embedUrl,
    }

    try {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(parsed.oembedUrl)}`,
      )

      if (response.ok) {
        const data = (await response.json()) as {
          title?: string
          thumbnail_url?: string
          width?: number
          height?: number
        }

        if (data.title && !existingTitle?.trim()) {
          fieldsToUpdate.title = data.title
        }
        if (data.thumbnail_url) {
          fieldsToUpdate.vimeoThumbnailUrl = data.thumbnail_url
        }
        if (data.width && data.height) {
          fieldsToUpdate.aspectRatio = simplifyAspectRatio(data.width, data.height)
        }

        patch.execute([{set: fieldsToUpdate}])
        setStatusMessage('Auto-filled Vimeo ID, embed link, thumbnail, and ratio!')
      } else {
        // Private videos sometimes block oEmbed; still fill ID & embed link cleanly
        patch.execute([{set: fieldsToUpdate}])
        setStatusMessage(
          'Saved Vimeo ID & embed link! (Private video: upload a Custom Cover Image below if needed.)',
        )
      }
    } catch {
      patch.execute([{set: fieldsToUpdate}])
      setStatusMessage('Saved Vimeo ID & embed link! Could not reach Vimeo for thumbnail.')
    } finally {
      setIsFetching(false)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value
    onChange(nextValue ? set(nextValue) : unset())
    setStatusMessage(null)
    setIsError(false)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
        <input
          type="url"
          value={value}
          onChange={handleChange}
          placeholder="https://vimeo.com/1024311415"
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
          }}
        />
        <button
          type="button"
          disabled={isFetching || !value.trim()}
          onClick={() => autoFillFromVimeo(value)}
          style={{
            padding: '8px 14px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: isFetching || !value.trim() ? '#94a3b8' : '#2563eb',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '13px',
            cursor: isFetching || !value.trim() ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {isFetching ? 'Fetching...' : 'Auto-fill from Vimeo'}
        </button>
      </div>

      {statusMessage && (
        <div
          style={{
            fontSize: '12px',
            color: isError ? '#dc2626' : '#15803d',
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  )
}
