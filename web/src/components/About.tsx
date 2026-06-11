import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiPhone, FiDownload, FiBriefcase, FiCode, FiLayers, FiBook } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { personalInfo, education, languages } from '@/data/portfolio'

const STATS = [
  { value: '2+', label: 'Years Exp.',  icon: FiBriefcase, color: 'var(--color-accent)' },
  { value: '4+', label: 'Projects',    icon: FiCode,      color: '#8b5cf6' },
  { value: '2',  label: 'Companies',   icon: FiLayers,    color: '#10b981' },
  { value: 'M.Sc', label: 'Pursuing',  icon: FiBook,      color: '#f59e0b' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation(0.12)

  const slide = (delay = 0) => ({
    initial: { opacity: 0, x: -24 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="about" className="py-16 px-4 sm:py-24 sm:px-6 lg:py-28">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div {...slide()} className="mb-14">
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-3">01 — About</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Left column ── */}
          <div className="space-y-8">

            {/* Bio text */}
            <motion.div {...slide(0.05)} className="space-y-4 text-secondary leading-7 text-sm sm:text-base">
              {personalInfo.about.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            {/* Contact pills */}
            <motion.div {...slide(0.12)} className="flex flex-col gap-2.5">
              {[
                { icon: FiPhone, value: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
                { icon: FiMail,  value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
                { icon: FiMapPin, value: personalInfo.location, href: undefined },
              ].map(({ icon: Icon, value, href }) => {
                const cls = 'flex items-center gap-3 text-sm text-secondary bg-surface border border-border px-4 py-2.5 rounded-xl hover:border-accent/40 hover:text-primary transition-all group'
                return href ? (
                  <a key={value} href={href} className={cls}>
                    <Icon size={14} className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                    {value}
                  </a>
                ) : (
                  <div key={value} className={cls}>
                    <Icon size={14} className="text-accent shrink-0" />
                    {value}
                  </div>
                )
              })}
            </motion.div>

            {/* Languages */}
            <motion.div {...slide(0.18)}>
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Languages</p>
              <div className="flex gap-2 flex-wrap">
                {languages.map((l) => (
                  <span key={l.name} className="text-xs border border-border text-secondary px-3 py-1.5 rounded-full bg-surface hover:border-accent/40 transition-colors">
                    {l.name} <span className="text-muted">· {l.level}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div {...slide(0.24)}>
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Education</p>
              <div className="space-y-3">
                {education.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.28 + i * 0.1 }}
                    className="flex justify-between items-start border border-border rounded-xl px-4 py-3.5 bg-surface hover:border-accent/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold">{e.degree}</p>
                      <p className="text-xs text-secondary mt-0.5">{e.institution}</p>
                    </div>
                    <span className="font-mono text-[10px] text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded shrink-0 ml-4 mt-0.5">{e.period}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.a
              href={personalInfo.resume}
              download="Swathika-Resume.pdf"
              {...slide(0.36)}
              className="inline-flex items-center gap-2 border border-accent text-accent px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent hover:text-bg transition-all"
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}
              whileTap={{ scale: 0.96 }}
            >
              <FiDownload size={14} />
              Download Resume
            </motion.a>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-8">

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative self-start"
            >
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-surface border border-border flex items-center justify-center overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(6,182,212,0.1)' }}>
                {personalInfo.avatar ? (
                  <img src={personalInfo.avatar} alt={personalInfo.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-black text-gradient select-none">
                    {personalInfo.name[0]}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-accent/20 rounded-2xl -z-10" />
            </motion.div>

            {/* Stats with icons */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.22 + i * 0.08 }}
                    className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2 hover:border-accent/30 transition-all"
                    whileHover={{ y: -2, boxShadow: `0 4px 20px ${s.color}18` }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${s.color}18`, color: s.color }}>
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs text-muted">{s.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
