import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCheckCircle } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { personalInfo } from '@/data/portfolio'

type FormState = { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

const SOCIALS = [
  { icon: FiGithub,   href: personalInfo.github,             label: 'GitHub',   desc: 'See my code' },
  { icon: FiLinkedin, href: personalInfo.linkedin,           label: 'LinkedIn', desc: 'Connect with me' },
  { icon: FiMail,     href: `mailto:${personalInfo.email}`,  label: 'Email',    desc: personalInfo.email },
]

export default function Contact() {
  const { ref, isInView } = useScrollAnimation(0.1)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all'

  return (
    <section id="contact" className="py-16 px-4 sm:py-24 sm:px-6 lg:py-28 relative overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div ref={ref} className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-3">05 — Contact</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3">Let's work together</h3>
              <p className="text-secondary leading-relaxed text-sm sm:text-base">
                I'm currently open to new opportunities. Whether you have a project in mind,
                a question, or just want to say hello — my inbox is always open.
              </p>
            </div>

            {/* Availability badge */}
            {personalInfo.available && (
              <div className="flex items-center gap-3 bg-green-400/5 border border-green-400/20 rounded-xl px-4 py-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <p className="text-sm text-secondary">
                  <span className="text-green-400 font-semibold">Available now</span> — open to frontend roles &amp; freelance work
                </p>
              </div>
            )}

            {/* What I can help with */}
            <div className="space-y-2.5">
              {[
                'Frontend development & UI engineering',
                'React / TypeScript projects',
                'HRMS, dashboards & SaaS apps',
                'Code reviews & collaboration',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-secondary">
                  <FiCheckCircle size={14} className="text-accent shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ icon: Icon, href, label, desc }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent/40 transition-all group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg transition-all shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{label}</p>
                    <p className="text-xs text-muted">{desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[380px] flex flex-col items-center justify-center text-center gap-5 bg-surface border border-accent/20 rounded-2xl p-10"
                style={{ boxShadow: '0 0 40px rgba(6,182,212,0.08)' }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <FiCheckCircle size={32} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Message sent!</h4>
                  <p className="text-secondary text-sm leading-relaxed">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-accent text-sm border border-accent/30 px-5 py-2 rounded-full hover:bg-accent/10 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-border rounded-2xl p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-muted mb-1.5 font-mono">Name</label>
                    <input id="name" name="name" required value={form.name} onChange={handleChange}
                      placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-muted mb-1.5 font-mono">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="john@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-muted mb-1.5 font-mono">Message</label>
                  <textarea id="message" name="message" rows={6} required value={form.message} onChange={handleChange}
                    placeholder="Hi, I'd love to work with you on..." className={`${inputClass} resize-none`} />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-bg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' }}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02, boxShadow: '0 0 24px rgba(6,182,212,0.4)' }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full inline-block" />
                      Sending...
                    </>
                  ) : (
                    <><FiSend size={15} /> Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
