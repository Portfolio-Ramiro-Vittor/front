export const env = {
  siteUrl: String(import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'),
  apiBaseUrl: String(import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'),
} as const
