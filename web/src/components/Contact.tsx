import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { personalInfo } from '@/data/portfolio'

type FormState = { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { ref, isInView } = useScrollAnimation(0.1)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your form service (Formspree, EmailJS, etc.)
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent transition-colors'

  return (
    <section id="contact" className="py-20 px-4 sm:py-28 sm:px-6 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm">05.</span>
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <span className="flex-1 h-px bg-border max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <h3 className="text-2xl font-bold mb-4">Let's work together</h3>
            <p className="text-secondary leading-relaxed mb-8">
              I'm currently open to new opportunities. Whether you have a project in mind, a question,
              or just want to say hello — my inbox is always open.
            </p>

            <div className="space-y-4 mb-10">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-secondary hover:text-accent transition-colors text-sm"
              >
                <FiMail className="text-accent" />
                {personalInfo.email}
              </a>
            </div>

            <div className="flex items-center gap-5">
              {[
                { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
                { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 bg-surface border border-border rounded-2xl p-10"
              >
                <span className="text-5xl">🎉</span>
                <h4 className="text-xl font-bold">Message sent!</h4>
                <p className="text-secondary text-sm">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-accent text-sm hover:underline"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-muted mb-1.5 font-mono">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-muted mb-1.5 font-mono">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-muted mb-1.5 font-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi, I'd love to work with you on..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-bg font-bold py-3 rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full inline-block"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={15} />
                      Send Message
                    </>
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
