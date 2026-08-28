import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { saveLead, validateLead } from './server/leads.js'

function contactApiPlugin() {
  return {
    name: 'pling-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }
        const chunks = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
            const error = validateLead(body)
            if (error) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: false, error }))
              return
            }
            const record = saveLead(body)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, id: record.id, receivedAt: record.receivedAt }))
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Kunne ikke lagre henvendelsen.' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['*'],
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
