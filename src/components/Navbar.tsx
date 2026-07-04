import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'services', href: '#services' },
  { label: 'work', href: '#work' },
  { label: 'how it works', href: '#how-it-works' },
  { label: 'about', href: '#about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 py-6 md:py-8 bg-gradient-to-b from-[#EDEEF5]/90 to-transparent backdrop-blur-[3px]"
    >
      <div className="grid grid-cols-12 max-w-7xl mx-auto px-6 md:px-10 items-center">
        {/* Logo — cols 1-3 */}
        <div className="col-span-6 md:col-span-3 flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M16 2L4 16h8l-2 10 12-14h-8l2-10z"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="6" r="1.5" fill="#9fff00" />
              <circle cx="22" cy="22" r="1.5" fill="#9fff00" />
              <circle cx="22" cy="8" r="1" fill="#9fff00" opacity="0.5" />
            </svg>
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              zapflow
            </span>
          </Link>
        </div>

        {/* Nav links — cols 4-9 (desktop only) */}
        <div className="hidden md:flex col-span-6 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-600 hover:text-ink transition-colors duration-200 lowercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — cols 10-12 */}
        <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3">
          <a
            href="#contact"
            className="hidden md:inline-block text-sm text-zinc-600 hover:text-ink transition-colors"
          >
            book a call
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 bg-brand-green text-black rounded-full px-5 py-2.5 text-sm font-medium hover:scale-105 transition-transform duration-200"
          >
            chat on whatsapp →
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-ink origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-ink"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-ink origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-bg-base/95 backdrop-blur-xl border-t border-black/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-lg text-zinc-700 hover:text-ink transition-colors lowercase"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-black/5">
                <a
                  href="#contact"
                  className="text-sm text-zinc-600"
                  onClick={() => setMobileOpen(false)}
                >
                  book a call
                </a>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-brand-green text-black rounded-full px-5 py-2.5 text-sm font-medium"
                >
                  chat on whatsapp →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
