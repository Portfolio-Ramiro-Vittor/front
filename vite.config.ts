import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * robots.txt and sitemap.xml need absolute origins, so they are emitted at
 * build time from VITE_SITE_URL instead of being shipped as static files.
 */
function siteFilesPlugin(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '')

  const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${base}/sitemap.xml`, ''].join('\n')

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${base}/</loc>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n')

  return {
    name: 'site-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'http://localhost:5173'

  return {
    plugins: [react(), tailwindcss(), siteFilesPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
              return 'gsap'
            }
            return undefined
          },
        },
      },
    },
  }
})
