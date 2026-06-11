import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowDown, FiMail } from 'react-icons/fi'
import { personalInfo } from '@/data/portfolio'

const ROLES = ['React JS Developer', 'Frontend Developer', 'UI Engineer', 'TypeScript Specialist']

const RINGS = [
  { size: 320, x: '4%',  y: '15%', dur: 7,  delay: 0   },
  { size: 200, x: '72%', y: '8%',  dur: 9,  delay: 1.2 },
  { size: 160, x: '82%', y: '62%', dur: 11, delay: 2   },
  { size: 260, x: '42%', y: '72%', dur: 8,  delay: 0.6 },
  { size: 120, x: '60%', y: '30%', dur: 6,  delay: 3   },
]

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const ref = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const target = ROLES[idx]
    const speed = deleting ? 35 : 75
    if (!deleting && text.length < target.length) {
      ref.current = setTimeout(() => setText(target.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === target.length) {
      ref.current = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && text.length > 0) {
      ref.current = setTimeout(() => setText(text.slice(0, -1)), speed)
    } else {
      setDeleting(false)
      setIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(ref.current)
  }, [text, deleting, idx])

  return (
    <span>
      <span className="text-accent">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[0.9em] bg-accent ml-0.5 align-middle"
      />
    </span>
  )
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } }
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-4 sm:px-6 pt-16 overflow-hidden">

      {/* Deep glow orbs */}
      <div className="pointer-events-none absolute -top-60 -left-40 w-[900px] h-[900px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.13) 0%, rgba(59,130,246,0.07) 40%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.11) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      {/* Animated floating rings */}
      {RINGS.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-accent/[0.07] pointer-events-none"
          style={{ width: ring.size, height: ring.size, left: ring.x, top: ring.y }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: ring.dur, repeat: Infinity, delay: ring.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Subtle dot grid */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />

      <div className="max-w-6xl mx-auto w-full py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Left content ── */}
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Status badge */}
          {personalInfo.available && (
            <motion.div variants={item} className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-secondary border border-border px-4 py-2 rounded-full bg-surface/60 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>
          )}

          {/* Greeting */}
          <motion.p variants={item} className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.div variants={item} className="mb-5 leading-none">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-primary">
              {personalInfo.name.split(' ')[0]}
            </h1>
            {personalInfo.name.split(' ').slice(1).join(' ') && (
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gradient">
                {personalInfo.name.split(' ').slice(1).join(' ')}
              </h1>
            )}
          </motion.div>

          {/* Typewriter role */}
          <motion.h2 variants={item} className="text-lg sm:text-2xl font-semibold text-secondary mb-5 h-8 sm:h-9">
            <Typewriter />
          </motion.h2>

          {/* Tagline */}
          <motion.p variants={item} className="text-secondary text-sm sm:text-base max-w-md leading-relaxed mb-10">
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            <motion.button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative text-bg font-bold px-7 py-3 rounded-full text-sm overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(6,182,212,0.5)' }}
              whileTap={{ scale: 0.96 }}
            >
              View My Work
            </motion.button>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 border border-accent/40 text-accent font-semibold px-7 py-3 rounded-full text-sm hover:border-accent hover:bg-accent/10 transition-all"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            >
              <FiMail size={14} /> Hire Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-5">
            {[
              { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
              { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-all"
                whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Icon size={17} />
              </motion.a>
            ))}
            <span className="w-px h-4 bg-border" />
            <a href={`mailto:${personalInfo.email}`}
              className="font-mono text-muted hover:text-secondary text-xs transition-colors hidden sm:block">
              {personalInfo.email}
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: terminal card + stats ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col items-center gap-5"
        >
          {/* Terminal card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-[340px] bg-surface border border-border rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 8px 40px rgba(6,182,212,0.08), 0 0 0 1px rgba(6,182,212,0.08)' }}
          >
            <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-2 border-b border-border">
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <span className="ml-auto font-mono text-[10px] text-muted">swathika.ts</span>
            </div>
            <div className="p-5 font-mono text-xs leading-[2] select-none">
              <p><span className="text-blue-400">const </span><span className="text-accent">developer</span><span className="text-secondary"> = {'{'}</span></p>
              <p className="pl-4"><span className="text-green-400">name</span><span className="text-secondary">: </span><span className="text-amber-300">"Swathika"</span><span className="text-secondary">,</span></p>
              <p className="pl-4"><span className="text-green-400">role</span><span className="text-secondary">: </span><span className="text-amber-300">"Frontend Developer"</span><span className="text-secondary">,</span></p>
              <p className="pl-4"><span className="text-green-400">tech</span><span className="text-secondary">: [</span></p>
              <p className="pl-8 text-amber-300">"React", "TypeScript",</p>
              <p className="pl-8 text-amber-300">"Tailwind", "Redux"</p>
              <p className="pl-4"><span className="text-secondary">],</span></p>
              <p className="pl-4"><span className="text-green-400">available</span><span className="text-secondary">: </span><span className="text-orange-400">true</span></p>
              <p><span className="text-secondary">{'}'}</span><motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block ml-1 text-accent">▊</motion.span></p>
            </div>
          </motion.div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-[340px]">
            {[
              { label: 'Experience', value: '2 Years' },
              { label: 'Companies', value: '2 Jobs' },
              { label: 'Projects', value: '4+ Built' },
              { label: 'Education', value: 'M.Sc CS' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.08 }}
                className="flex flex-col items-center bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent/40 hover:bg-surface-2 transition-all duration-200 cursor-default"
                whileHover={{ y: -2 }}
              >
                <span className="text-sm font-bold text-accent">{stat.value}</span>
                <span className="text-[10px] text-muted mt-0.5">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <FiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
