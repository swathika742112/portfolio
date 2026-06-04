import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi'
import { personalInfo } from '@/data/portfolio'

const NAV = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const SOCIALS = [
  { icon: FiGithub,   href: personalInfo.github,             label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin,           label: 'LinkedIn' },
  { icon: FiMail,     href: `mailto:${personalInfo.email}`,  label: 'Email' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo  = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-border bg-surface/40">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), var(--color-accent-2), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ── Top grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            {/* Brand column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="w-10 h-10 object-contain" />
                <div>
                  <p className="font-bold text-base text-primary leading-tight">Swathika</p>
                  <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">Portfolio</p>
                </div>
              </div>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                {personalInfo.tagline}
              </p>
              {/* Open to work badge */}
              {personalInfo.available && (
                <span className="inline-flex items-center gap-2 w-fit text-xs font-mono
                  text-secondary border border-border px-3 py-1.5 rounded-full bg-surface">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to opportunities
                </span>
              )}
            </div>

            {/* Quick links column */}
            <div>
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-5">Quick Links</p>
              <ul className="flex flex-col gap-3">
                {NAV.map(link => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-secondary hover:text-accent text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-4 h-px bg-border group-hover:bg-accent group-hover:w-6 transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-5">Get In Touch</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 text-secondary hover:text-accent text-sm transition-colors group">
                    <FiMail size={14} className="text-accent shrink-0" />
                    {personalInfo.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-3 text-secondary hover:text-accent text-sm transition-colors">
                    <FiPhone size={14} className="text-accent shrink-0" />
                    {personalInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-secondary text-sm">
                  <FiMapPin size={14} className="text-accent shrink-0" />
                  {personalInfo.location}
                </li>
              </ul>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-border
                      text-muted hover:text-accent hover:border-accent transition-all"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-border mb-6" />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted text-center sm:text-left">
              © {new Date().getFullYear()} Swathika. All rights reserved. &nbsp;·&nbsp; Built with{' '}
              <span className="text-accent">React</span> +{' '}
              <span className="text-accent">TypeScript</span> +{' '}
              <span className="text-accent">Framer Motion</span>
            </p>

            {/* Back to top */}
            <motion.button
              onClick={scrollTop}
              className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent
                border border-border hover:border-accent px-4 py-2 rounded-full transition-all"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to top <FiArrowUp size={12} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
