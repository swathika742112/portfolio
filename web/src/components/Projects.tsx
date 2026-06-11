import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { projects } from '@/data/portfolio'

export default function Projects() {
  const { ref, isInView } = useScrollAnimation(0.08)
  const [showAll, setShowAll] = useState(false)

  const displayed = showAll ? projects : projects.filter(p => p.featured)

  return (
    <section id="projects" className="py-20 px-4 sm:py-28 sm:px-6 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-3">03 — Projects</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            What I've <span className="text-gradient">Built</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-secondary mb-12 max-w-xl"
        >
          Things I've built — each one solving a real problem.
        </motion.p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative bg-surface border border-border rounded-2xl flex flex-col overflow-hidden hover:-translate-y-2 transition-all duration-300"
                style={{
                  '--project-color': project.color,
                  boxShadow: 'none',
                } as React.CSSProperties}
                whileHover={{ boxShadow: `0 8px 40px ${project.color}22, 0 0 0 1px ${project.color}30` }}
              >
                {/* Color banner header */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}55)` }}
                />

                <div className="p-6 flex flex-col flex-1">

                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${project.color}10 0%, transparent 60%)` }}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4 relative">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${project.color}15`, borderColor: `${project.color}30` }}
                  >
                    <span className="text-lg font-black" style={{ color: project.color }}>
                      {project.title[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-muted border border-border px-2 py-0.5 rounded-full">
                        <FiStar size={9} className="text-accent" /> Featured
                      </span>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                      className="text-muted hover:text-primary transition-colors p-1">
                      <FiGithub size={16} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live"
                      className="text-muted hover:text-primary transition-colors p-1">
                      <FiExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Title + description */}
                <div className="flex-1 relative">
                  <h3 className="font-bold text-sm mb-2 group-hover:text-accent transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5 relative">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-muted border border-border px-2 py-0.5 rounded-md hover:border-accent/40 hover:text-secondary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Toggle */}
        {projects.length > displayed.length || showAll ? (
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => setShowAll(v => !v)}
              className="border border-border text-secondary px-8 py-2.5 rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-all"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            >
              {showAll ? 'Show Less' : `Show All ${projects.length} Projects`}
            </motion.button>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
