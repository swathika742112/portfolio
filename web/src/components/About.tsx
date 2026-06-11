import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiPhone, FiDownload } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { personalInfo, education, languages } from '@/data/portfolio'

const STATS = [
  { value: '2+', label: 'Years Exp.' },
  { value: '4+', label: 'Projects' },
  { value: '2', label: 'Companies' },
  { value: 'M.Sc', label: 'Pursuing' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation(0.15)

  const slide = (delay = 0) => ({
    initial: { opacity: 0, x: -30 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  })

  return (
    <section id="about" className="py-20 px-4 sm:py-28 sm:px-6 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div {...slide()} className="mb-16">
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-3">01 — About</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text + contact + education */}
          <div>
            <motion.div {...slide(0.05)} className="space-y-4 text-secondary leading-7">
              {personalInfo.about.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            {/* Contact info */}
            <motion.div {...slide(0.15)} className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-secondary">
                <FiPhone className="text-accent shrink-0" />
                {personalInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <FiMail className="text-accent shrink-0" />
                {personalInfo.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <FiMapPin className="text-accent shrink-0" />
                {personalInfo.location}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div {...slide(0.2)} className="mt-8">
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Languages</p>
              <div className="flex gap-3 flex-wrap">
                {languages.map((l) => (
                  <span key={l.name} className="text-xs border border-border text-secondary px-3 py-1 rounded-full">
                    {l.name} <span className="text-muted">— {l.level}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div {...slide(0.25)} className="mt-8 space-y-3">
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Education</p>
              {education.map((e) => (
                <div key={e.id} className="flex justify-between items-start border border-border rounded-xl px-4 py-3 bg-surface">
                  <div>
                    <p className="text-sm font-semibold">{e.degree}</p>
                    <p className="text-xs text-secondary">{e.institution}</p>
                  </div>
                  <span className="font-mono text-[10px] text-muted shrink-0 ml-4 mt-0.5">{e.period}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href={personalInfo.resume}
              download="Swathika-Resume.pdf"
              {...slide(0.35)}
              className="mt-8 inline-flex items-center gap-2 border border-accent text-accent px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent hover:text-bg transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <FiDownload size={14} />
              Download Resume
            </motion.a>
          </div>

          {/* Right: avatar + stats */}
          <div className="flex flex-col items-start gap-10">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-48 h-48 rounded-2xl bg-surface border border-border flex items-center justify-center overflow-hidden">
                {personalInfo.avatar ? (
                  <img src={personalInfo.avatar} alt={personalInfo.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-black text-accent">
                    {personalInfo.name[0]}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-accent/25 rounded-2xl -z-10" />
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  className="bg-surface border border-border rounded-xl p-4 text-center hover:border-accent/40 transition-colors"
                >
                  <div className="text-2xl font-black text-accent mb-0.5">{s.value}</div>
                  <div className="text-xs text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
