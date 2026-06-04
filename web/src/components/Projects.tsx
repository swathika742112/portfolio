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
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-accent text-sm">03.</span>
          <h2 className="text-3xl font-bold">Projects</h2>
          <span className="flex-1 h-px bg-border max-w-xs" />
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
                className="group relative bg-surface border border-border rounded-2xl p-6 flex flex-col overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg"
                style={{ '--project-color': project.color } as React.CSSProperties}
              >
                {/* Gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300 opacity-50 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${project.color}08 0%, transparent 60%)` }}
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
