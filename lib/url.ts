export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

// Set NEXT_PUBLIC_CONTACT_EMAIL to the real inbox before launch.
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@opencoders.com'
