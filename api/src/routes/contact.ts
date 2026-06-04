import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { sendContactEmail } from '../lib/mailer'

const router = Router()

const limiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: { error: 'Too many messages. Try again later.' } })

const schema = z.object({
  name:    z.string().min(2).max(80),
  email:   z.string().email(),
  message: z.string().min(10).max(2000),
})

router.post('/', limiter, async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    return
  }

  const { name, email, message } = parsed.data

  await prisma.contactMessage.create({ data: { name, email, message } })

  try {
    await sendContactEmail({ name, email, message })
  } catch (err) {
    console.error('Email send failed:', err)
    // Message is saved to DB; don't fail the request over email
  }

  res.json({ success: true })
})

export default router
