import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function neonApiPlugin(): Plugin {
  return {
    name: 'neon-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/applications' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body)
              const { saveApplication } = await import('./server/api.ts')
              const result = await saveApplication(data)
              res.writeHead(result.success ? 200 : 500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(result))
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Internal Server Error'
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: message }))
            }
          })
          return
        }

        if (req.url === '/api/applications/status' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}')
              const query = parsed.query || parsed.identifier || ''
              const { getApplicationStatus } = await import('./server/api.ts')
              const result = await getApplicationStatus(query)
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(result))
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Internal Server Error'
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: message }))
            }
          })
          return
        }

        if (req.url === '/api/admin/login' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const { username, password } = JSON.parse(body || '{}')
              const { adminLogin } = await import('./server/api.ts')
              const result = await adminLogin(username, password)
              res.writeHead(result.success ? 200 : 401, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(result))
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Internal Server Error'
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: message }))
            }
          })
          return
        }

        if (req.url === '/api/admin/applications' && req.method === 'GET') {
          try {
            const { getAllApplications } = await import('./server/api.ts')
            const result = await getAllApplications()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(result))
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Internal Server Error'
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: message }))
          }
          return
        }

        if (req.url === '/api/admin/update-status' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const { applicationRef, status } = JSON.parse(body || '{}')
              const { updatePaymentStatus } = await import('./server/api.ts')
              const result = await updatePaymentStatus(applicationRef, status)
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(result))
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Internal Server Error'
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: message }))
            }
          })
          return
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), neonApiPlugin()],
})
