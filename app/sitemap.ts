import type { MetadataRoute } from 'next'
import { allPaths } from '@/lib/site'
import { getSiteUrl } from '@/lib/url'

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl()
  const now = new Date()
  return allPaths().map((path) => ({
    url: `${origin}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
