import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import contactRouter    from './routes/contact'
import publicRouter     from './routes/public'
import authRouter       from './routes/auth'
import adminRouter      from './routes/admin'

const app = express()
const PORT = Number(process.env.PORT ?? 4000)

// ── Global middleware ────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}))

// ── Routes ───────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/contact',    contactRouter)
app.use('/api',            publicRouter)
app.use('/api/auth',       authRouter)
app.use('/api/admin',      adminRouter)

// ── Error handler ────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
