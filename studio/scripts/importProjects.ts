import {getCliClient} from 'sanity/cli'
import existingProjects from '../../src/site/projects'

// Exact sort numbers for year ranges so they keep their original order
// (and any future years like 2025 or 2026 automatically appear at the top).
const RANGE_SORT_YEARS: Record<string, number> = {
  '2020 - 2022': 2020.5,
  '2016-2019': 2016.5,
  '2013-2018': 2013.5,
  '2009-2010': 2009.5,
  '2007-2014': 2007.8,
  '2006-2009': 2007.5,
  '2007-2009': 2007.2,
}

function getSortYear(year: number | string): number {
  if (typeof year === 'number') return year
  const trimmed = year.trim()
  if (RANGE_SORT_YEARS[trimmed] !== undefined) return RANGE_SORT_YEARS[trimmed]
  const parsed = parseInt(trimmed, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

function makeDocumentId(yearLabel: string): string {
  const safeSlug = yearLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `projectYear-${safeSlug}`
}

async function importAllProjects() {
  const sanityClient = getCliClient({apiVersion: '2025-01-01'})
  const transaction = sanityClient.transaction()

  let totalEntries = 0

  for (const yearGroup of existingProjects) {
    const yearLabel = String(yearGroup.year).trim()
    const sortYear = getSortYear(yearGroup.year)
    const documentId = makeDocumentId(yearLabel)

    const formattedEntries = yearGroup.entries.map((entry, index) => {
      totalEntries += 1
      return {
        _key: `${documentId}-entry-${index + 1}`,
        _type: 'projectEntry',
        role: entry.role.trim(),
        title: entry.title.trim(),
        company: entry.company ? entry.company.trim() : '',
        isFeatured: false,
      }
    })

    transaction.createOrReplace({
      _id: documentId,
      _type: 'projectYear',
      yearLabel,
      sortYear,
      entries: formattedEntries,
    })
  }

  await transaction.commit()
  console.log(
    `Imported ${existingProjects.length} project years (${totalEntries} total projects) into Sanity!`,
  )
}

importAllProjects().catch((error) => {
  console.error('Project import failed:', error)
  process.exit(1)
})
