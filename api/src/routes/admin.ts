import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()
router.use(requireAuth)

// ── helpers ──────────────────────────────────────────────────
const projectSchema = z.object({
  title:       z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  tags:        z.array(z.string()).min(1),
  github:      z.string().default('#'),
  live:        z.string().default('#'),
  color:       z.string().default('#ff6b6b'),
  featured:    z.boolean().default(false),
  order:       z.number().int().default(0),
})

const skillSchema = z.object({
  name:     z.string().min(1).max(60),
  level:    z.number().int().min(0).max(100),
  category: z.string().min(1).max(60),
  order:    z.number().int().default(0),
})

const experienceSchema = z.object({
  role:        z.string().min(1).max(120),
  company:     z.string().min(1).max(120),
  period:      z.string().min(1).max(40),
  description: z.string().min(1).max(600),
  tags:        z.array(z.string()),
  order:       z.number().int().default(0),
})

// ── Contact messages ─────────────────────────────────────────
router.get('/messages', async (req, res) => {
  const unread = req.query.unread === 'true'
  const messages = await prisma.contactMessage.findMany({
    where: unread ? { read: false } : {},
    orderBy: { createdAt: 'desc' },
  })
  res.json(messages)
})

router.patch('/messages/:id/read', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.contactMessage.update({ where: { id }, data: { read: true } })
  res.json({ success: true })
})

router.delete('/messages/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.contactMessage.delete({ where: { id } })
  res.json({ success: true })
})

// ── Projects ─────────────────────────────────────────────────
router.post('/projects', async (req, res) => {
  const parsed = projectSchema.safeParse(req.body)
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return }
  const { tags, ...rest } = parsed.data
  const project = await prisma.project.create({ data: { ...rest, tags: JSON.stringify(tags) } })
  res.status(201).json(project)
})

router.put('/projects/:id', async (req, res) => {
  const id = Number(req.params.id)
  const parsed = projectSchema.partial().safeParse(req.body)
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return }
  const { tags, ...rest } = parsed.data
  const data = tags ? { ...rest, tags: JSON.stringify(tags) } : rest
  const project = await prisma.project.update({ where: { id }, data })
  res.json(project)
})

router.delete('/projects/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.project.delete({ where: { id } })
  res.json({ success: true })
})

// ── Skills ───────────────────────────────────────────────────
router.post('/skills', async (req, res) => {
  const parsed = skillSchema.safeParse(req.body)
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return }
  const skill = await prisma.skill.create({ data: parsed.data })
  res.status(201).json(skill)
})

router.put('/skills/:id', async (req, res) => {
  const id = Number(req.params.id)
  const parsed = skillSchema.partial().safeParse(req.body)
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return }
  const skill = await prisma.skill.update({ where: { id }, data: parsed.data })
  res.json(skill)
})

router.delete('/skills/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.skill.delete({ where: { id } })
  res.json({ success: true })
})

// ── Experience ───────────────────────────────────────────────
router.post('/experience', async (req, res) => {
  const parsed = experienceSchema.safeParse(req.body)
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return }
  const { tags, ...rest } = parsed.data
  const exp = await prisma.experience.create({ data: { ...rest, tags: JSON.stringify(tags) } })
  res.status(201).json(exp)
})

router.put('/experience/:id', async (req, res) => {
  const id = Number(req.params.id)
  const parsed = experienceSchema.partial().safeParse(req.body)
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return }
  const { tags, ...rest } = parsed.data
  const data = tags ? { ...rest, tags: JSON.stringify(tags) } : rest
  const exp = await prisma.experience.update({ where: { id }, data })
  res.json(exp)
})

router.delete('/experience/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.experience.delete({ where: { id } })
  res.json({ success: true })
})

export default router
