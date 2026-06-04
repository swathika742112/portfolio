import { Router } from 'express'
import prisma from '../lib/prisma'

const router = Router()

// ── helpers ──────────────────────────────────────────────────
function parseTags(raw: string): string[] {
  try { return JSON.parse(raw) } catch { return [] }
}

function toProject(p: { id: number; title: string; description: string; tags: string; github: string; live: string; color: string; featured: boolean; views: number; likes: number; order: number }) {
  return { ...p, tags: parseTags(p.tags) }
}

function toExperience(e: { id: number; role: string; company: string; period: string; description: string; tags: string; order: number }) {
  return { ...e, tags: parseTags(e.tags) }
}

// ── Projects ─────────────────────────────────────────────────
router.get('/projects', async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, description: true, tags: true, github: true, live: true, color: true, featured: true, views: true, likes: true, order: true },
  })
  res.json(projects.map(toProject))
})

// ── Skills ───────────────────────────────────────────────────
router.get('/skills', async (_req, res) => {
  const skills = await prisma.skill.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] })
  res.json(skills)
})

// ── Experience ───────────────────────────────────────────────
router.get('/experience', async (_req, res) => {
  const experience = await prisma.experience.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
  res.json(experience.map(toExperience))
})

// ── View counter ─────────────────────────────────────────────
router.post('/projects/:id/view', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return }

  const project = await prisma.project.update({
    where: { id },
    data: { views: { increment: 1 } },
    select: { id: true, views: true },
  }).catch(() => null)

  if (!project) { res.status(404).json({ error: 'Project not found' }); return }
  res.json(project)
})

// ── Like toggle ──────────────────────────────────────────────
router.post('/projects/:id/like', async (req, res) => {
  const id = Number(req.params.id)
  const { liked } = req.body as { liked?: boolean }
  if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return }

  const project = await prisma.project.update({
    where: { id },
    data: { likes: { increment: liked ? 1 : -1 } },
    select: { id: true, likes: true },
  }).catch(() => null)

  if (!project) { res.status(404).json({ error: 'Project not found' }); return }
  res.json(project)
})

export default router
