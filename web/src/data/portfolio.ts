export const personalInfo = {
  name: 'Swathika',
  role: 'React JS Developer',
  tagline: 'Building fast, responsive web apps with React, TypeScript & modern UI libraries.',
  email: 'test@gmail.com',
  phone: '0909876543',
  github: 'https://github.com/swathika74',
  linkedin: 'https://linkedin.com/in/swathika74',
  twitter: 'https://twitter.com/swathika74',
  resume: '/resume.pdf',
  avatar: null as string | null,
  about: `Frontend Developer with nearly 2 years of experience in building responsive web applications using HTML, CSS, JavaScript, TypeScript, and React.js. Skilled in reusable component development, REST API integration, UI performance optimization, and collaborating in Agile development environments.

Currently pursuing a Master of Computer Science at Madurai Kamaraj College while working as a Frontend Developer at Jearnmartin, Madurai — building HRMS modules and scalable UI solutions with React.js and TypeScript.`,
  location: 'Madurai, Tamil Nadu',
  available: true,
}

export const skills = [
  // Frontend
  { name: 'React.js', level: 90, category: 'Frontend' },
  { name: 'HTML5 / CSS3', level: 92, category: 'Frontend' },
  { name: 'Responsive Web Design', level: 88, category: 'Frontend' },
  { name: 'REST API Integration', level: 85, category: 'Frontend' },
  // Language
  { name: 'TypeScript', level: 85, category: 'Language' },
  { name: 'JavaScript (ES6+)', level: 90, category: 'Language' },
  // UI Libraries
  { name: 'Tailwind CSS', level: 88, category: 'UI Libraries' },
  { name: 'Material-UI', level: 85, category: 'UI Libraries' },
  { name: 'Bootstrap', level: 82, category: 'UI Libraries' },
  { name: 'Framer Motion', level: 78, category: 'UI Libraries' },
  // State
  { name: 'Redux', level: 80, category: 'State' },
  { name: 'Context API', level: 85, category: 'State' },
  // Database
  { name: 'MySQL', level: 65, category: 'Database' },
  // Version Control
  { name: 'Git', level: 88, category: 'Version Control' },
  { name: 'GitHub', level: 85, category: 'Version Control' },
  { name: 'Azure DevOps', level: 70, category: 'Version Control' },
  // Tools
  { name: 'VS Code', level: 95, category: 'Tools' },
  { name: 'Cursor', level: 85, category: 'Tools' },
  { name: 'GitHub Copilot', level: 82, category: 'Tools' },
  { name: 'ChatGPT', level: 88, category: 'Tools' },
  { name: 'Claude AI', level: 85, category: 'Tools' },
  { name: 'Perplexity AI', level: 78, category: 'Tools' },
  { name: 'OpenAI Codex', level: 75, category: 'Tools' },
]

export const projects = [
  {
    id: 1,
    title: 'QRS-Me | Intelligent QR Solutions',
    description:
      'Responsive web application for smart QR code generation and management. Built reusable UI components and integrated REST APIs for dynamic data rendering.',
    tags: ['React.js', 'TypeScript', 'Material-UI', 'Redux', 'REST API'],
    github: '#',
    live: '#',
    featured: true,
    color: '#ff6b6b',
  },
  {
    id: 2,
    title: 'HRMS Project',
    description:
      'HR Management System with Employee, Attendance, Leave, and Exit Management modules. Includes multilingual support, session handling, and responsive dashboards.',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Bootstrap'],
    github: '#',
    live: '#',
    featured: true,
    color: '#38bdf8',
  },
  {
    id: 3,
    title: 'UI Component Library',
    description:
      'A collection of reusable and scalable React components built with Tailwind CSS and Material-UI, designed for rapid application development.',
    tags: ['React.js', 'Tailwind CSS', 'Material-UI', 'TypeScript'],
    github: '#',
    live: '#',
    featured: true,
    color: '#c084fc',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description:
      'Personal portfolio with dark/light mode, smooth animations, Express backend API, and an admin panel for managing content.',
    tags: ['React.js', 'TypeScript', 'Framer Motion', 'Express', 'Prisma'],
    github: '#',
    live: '#',
    featured: false,
    color: '#34d399',
  },
]

export const experience = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Jearnmartin — Madurai',
    period: 'OCT 2025 — Present',
    project: 'HRMS Project',
    bullets: [
      'Developed HRMS modules including Employee, Attendance, Leave, and Exit Management.',
      'Built responsive dashboards and reusable UI components using React.js and TypeScript.',
      'Implemented multilingual support and API integrations.',
      'Worked on pagination, session handling, and responsive layouts.',
      'Optimized UI performance and collaborated with backend teams for feature delivery.',
    ],
    tags: ['React.js', 'TypeScript', 'HRMS', 'Multilingual', 'REST API'],
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: 'Tech Global India — Madurai',
    period: 'SEP 2024 — 2025',
    project: 'QRS-Me | Intelligent QR Solutions',
    bullets: [
      'Developed responsive web applications using React.js and TypeScript.',
      'Built reusable and scalable UI components.',
      'Integrated REST APIs for dynamic data rendering.',
      'Designed responsive layouts using Material-UI, Tailwind CSS, and Bootstrap.',
      'Implemented state management using Redux and Context API.',
      'Optimized application performance and fixed UI issues.',
      'Collaborated with designers and backend developers in Agile environments.',
    ],
    tags: ['React.js', 'TypeScript', 'Material-UI', 'Redux', 'Agile'],
  },
]

export const education = [
  {
    id: 1,
    degree: 'Master of Computer Science',
    institution: 'Madurai Kamaraj College',
    location: 'Madurai',
    period: '2025 — Present',
  },
  {
    id: 2,
    degree: 'Bachelor of Computer Science',
    institution: 'Managayarkarasi College of Arts and Science for Women',
    location: 'Madurai',
    period: '2021 — 2024',
  },
]

export const languages = [
  { name: 'Tamil', level: 'Fluent' },
  { name: 'English', level: 'Intermediate' },
]

export const volunteering = [
  {
    title: 'National Service Scheme (NSS) Volunteer',
    description:
      'Participated in social initiatives, health awareness campaigns, and environmental projects, enhancing teamwork and leadership skills.',
  },
]
