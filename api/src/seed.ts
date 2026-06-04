import 'dotenv/config'
import bcrypt from 'bcryptjs'
import prisma from './lib/prisma'

async function main() {
  // Admin account
  const email    = process.env.ADMIN_EMAIL    ?? 'admin@yourname.dev'
  const password = process.env.ADMIN_PASSWORD ?? 'changeme123'
  const hash = await bcrypt.hash(password, 10)

  await prisma.admin.upsert({
    where:  { email },
    update: { passwordHash: hash },
    create: { email, passwordHash: hash },
  })
  console.log(`✓ Admin: ${email}`)

  // Jone's projects
  const projects = [
    { title: 'QRS-Me | Intelligent QR Solutions', description: 'Responsive web app for smart QR code generation. Built reusable UI components and integrated REST APIs.', tags: JSON.stringify(['React.js', 'TypeScript', 'Material-UI', 'Redux', 'REST API']), color: '#ff6b6b', featured: true, order: 1 },
    { title: 'HRMS Project', description: 'HR Management System with Employee, Attendance, Leave, and Exit modules. Includes multilingual support and responsive dashboards.', tags: JSON.stringify(['React.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Bootstrap']), color: '#38bdf8', featured: true, order: 2 },
    { title: 'UI Component Library', description: 'Reusable and scalable React components with Tailwind CSS and Material-UI for rapid development.', tags: JSON.stringify(['React.js', 'Tailwind CSS', 'Material-UI', 'TypeScript']), color: '#c084fc', featured: true, order: 3 },
    { title: 'Portfolio Website', description: 'Personal portfolio with dark/light mode, animations, Express backend, and admin panel.', tags: JSON.stringify(['React.js', 'TypeScript', 'Framer Motion', 'Express', 'Prisma']), color: '#34d399', featured: false, order: 4 },
  ]

  for (const p of projects) {
    await prisma.project.upsert({ where: { id: p.order }, update: p, create: p })
  }
  console.log(`✓ ${projects.length} projects seeded`)

  // Jone's skills
  const skills = [
    { name: 'React.js', level: 90, category: 'Frontend', order: 1 },
    { name: 'TypeScript', level: 85, category: 'Language', order: 2 },
    { name: 'JavaScript (ES6+)', level: 90, category: 'Language', order: 3 },
    { name: 'HTML5 / CSS3', level: 92, category: 'Frontend', order: 4 },
    { name: 'Responsive Web Design', level: 88, category: 'Frontend', order: 5 },
    { name: 'Tailwind CSS', level: 88, category: 'UI Libraries', order: 6 },
    { name: 'Material-UI', level: 85, category: 'UI Libraries', order: 7 },
    { name: 'Bootstrap', level: 82, category: 'UI Libraries', order: 8 },
    { name: 'Framer Motion', level: 78, category: 'UI Libraries', order: 9 },
    { name: 'Redux / Context API', level: 80, category: 'State', order: 10 },
    { name: 'REST API Integration', level: 85, category: 'Frontend', order: 11 },
    { name: 'MySQL', level: 65, category: 'Database', order: 12 },
    { name: 'Git / GitHub', level: 85, category: 'Tools', order: 13 },
    { name: 'Azure DevOps', level: 70, category: 'Tools', order: 14 },
  ]

  for (const s of skills) {
    await prisma.skill.upsert({ where: { id: s.order }, update: s, create: s })
  }
  console.log(`✓ ${skills.length} skills seeded`)

  // Jone's experience
  const experience = [
    { role: 'Frontend Developer', company: 'Jearnmartin — Madurai', period: 'OCT 2025 — Present', description: 'Developing HRMS modules (Employee, Attendance, Leave, Exit). Responsive dashboards, multilingual support, session handling.', tags: JSON.stringify(['React.js', 'TypeScript', 'HRMS', 'Multilingual', 'REST API']), order: 1 },
    { role: 'Frontend Developer', company: 'Tech Global India — Madurai', period: 'SEP 2024 — 2025', description: 'Built QRS-Me (Intelligent QR Solutions). Reusable components, REST API integration, Redux state management, Agile collaboration.', tags: JSON.stringify(['React.js', 'TypeScript', 'Material-UI', 'Redux', 'Agile']), order: 2 },
  ]

  for (const e of experience) {
    await prisma.experience.upsert({ where: { id: e.order }, update: e, create: e })
  }
  console.log(`✓ ${experience.length} experience records seeded`)

  console.log('\nSeed complete.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
