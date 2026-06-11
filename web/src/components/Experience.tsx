import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { experience } from '@/data/portfolio'

export default function Experience() {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section id="experience" className="py-20 px-4 sm:py-28 sm:px-6 lg:py-32 bg-surface/30">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-3">04 — Experience</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Work <span className="text-gradient">History</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-0 top-2 bottom-2 w-px bg-border hidden md:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ originY: 0 }}
          />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative md:pl-10"
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-[-5px] top-3 w-[10px] h-[10px] rounded-full bg-accent hidden md:block"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                />

                <div className={`bg-surface border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${i === 0 ? 'border-accent/40 shadow-[0_0_24px_var(--color-accent)12]' : 'border-border hover:border-accent/30'}`}>
                  {i === 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-green-400 border border-green-400/30 bg-green-400/10 px-2.5 py-1 rounded-full mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Current
                    </span>
                  )}
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <div>
                      <h3 className="font-bold text-base">{job.role}</h3>
                      <p className="text-accent text-sm font-medium">{job.company}</p>
                    </div>
                    <span className="font-mono text-xs text-muted shrink-0 sm:mt-0.5">{job.period}</span>
                  </div>

                  {/* Project name */}
                  <p className="font-mono text-xs text-secondary mb-4 mt-1 italic">
                    {job.project}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 mb-5">
                    {job.bullets.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.15 + j * 0.05 + 0.4 }}
                        className="flex items-start gap-2 text-secondary text-sm leading-relaxed"
                      >
                        <span className="text-accent mt-1.5 shrink-0 text-[8px]">◆</span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
