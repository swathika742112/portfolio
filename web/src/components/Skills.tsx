import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { skills } from '@/data/portfolio'

const CATEGORIES = ['All', 'Frontend', 'Language', 'UI Libraries', 'State', 'Version Control', 'Database', 'Tools']

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:          '#06b6d4',   // cyan
  Language:          '#3b82f6',   // blue
  'UI Libraries':    '#8b5cf6',   // violet
  State:             '#10b981',   // emerald
  'Version Control': '#f59e0b',   // amber
  Database:          '#ec4899',   // pink
  Tools:             '#0ea5e9',   // sky blue
}

export default function Skills() {
  const { ref, isInView } = useScrollAnimation(0.1)
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active)
  const color = CATEGORY_COLORS[active] ?? '#ff6b6b'

  return (
    <section id="skills" className="py-20 px-4 sm:py-28 sm:px-6 lg:py-32 bg-surface/30">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-accent text-sm">02.</span>
          <h2 className="text-3xl font-bold">Skills</h2>
          <span className="flex-1 h-px bg-border max-w-xs" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-secondary mb-10 max-w-lg"
        >
          Technologies and tools I work with daily.
        </motion.p>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.filter(c => c === 'All' || skills.some(s => s.category === c)).map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'border-accent bg-accent text-bg'
                  : 'border-border text-secondary hover:border-accent/50 hover:text-primary'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 opacity-60">
                  {skills.filter(s => s.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => {
              const cardColor = CATEGORY_COLORS[skill.category] ?? '#ff6b6b'
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group bg-surface border border-border rounded-2xl p-5 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1"
                  style={{ '--card-color': cardColor } as React.CSSProperties}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: cardColor }}
                      />
                      <span className="font-semibold text-sm">{skill.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: cardColor }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: cardColor }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.1, delay: i * 0.05 + 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-muted">{skill.category}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Summary count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center font-mono text-xs text-muted"
        >
          Showing <span style={{ color }}>{ filtered.length }</span> of {skills.length} skills
        </motion.p>
      </div>
    </section>
  )
}
