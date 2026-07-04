import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ChatMessage {
  id: number
  sender: 'customer' | 'ai'
  text: string
}

interface QuickReply {
  text: string
  nextState: string
}

const initialMessages: ChatMessage[] = [
  { id: 1, sender: 'ai', text: "Hey! 👋 I'm ZapFlow's AI automation agent. Try clicking one of the options below to see how I handle customer queries." },
]

const mainOptions: QuickReply[] = [
  { text: 'Check order status 📦', nextState: 'check_order' },
  { text: 'Book clinic appointment 📅', nextState: 'book_clinic' },
  { text: 'Can you generate video demo? 🎥', nextState: 'generate_video' },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-brand-green/10 rounded-2xl rounded-bl-md w-fit">
      <span className="typing-dot w-1.5 h-1.5 bg-zinc-400 rounded-full" />
      <span className="typing-dot w-1.5 h-1.5 bg-zinc-400 rounded-full" />
      <span className="typing-dot w-1.5 h-1.5 bg-zinc-400 rounded-full" />
    </div>
  )
}

export default function LiveDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [options, setOptions] = useState<QuickReply[]>(mainOptions)
  const [showTyping, setShowTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, showTyping])

  const handleOptionClick = (option: QuickReply) => {
    // Add user message
    const userMsgId = messages.length + 1
    const newMessages = [
      ...messages,
      { id: userMsgId, sender: 'customer' as const, text: option.text },
    ]
    setMessages(newMessages)
    setOptions([]) // Hide options while typing
    setShowTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      let aiText = ''
      let nextReplies: QuickReply[] = []

      switch (option.nextState) {
        case 'check_order':
          aiText = 'Checking database... 🔍 Found it! Your order #4521 is out for delivery! ETA: ~15 mins. Would you like to add anything else to the delivery?'
          nextReplies = [
            { text: 'Can I add a soda? 🥤', nextState: 'add_soda' },
            { text: 'No, that\'s all! Thanks', nextState: 'reset' },
          ]
          break
        case 'add_soda':
          aiText = 'Unfortunately, the rider has already departed. 🚴 But I can create a new priority delivery order for the soda right now! Shall we?'
          nextReplies = [
            { text: 'Yes, please! 🚀', nextState: 'reset_with_thanks' },
            { text: 'No, it\'s fine.', nextState: 'reset' },
          ]
          break
        case 'book_clinic':
          aiText = 'Sure! 📅 Dr. Patel has slots open tomorrow at Nova Clinic: 10:00 AM or 2:30 PM. Which one works best for you?'
          nextReplies = [
            { text: '10:00 AM ☀️', nextState: 'confirm_booking' },
            { text: '2:30 PM ⛅', nextState: 'confirm_booking' },
          ]
          break
        case 'confirm_booking':
          aiText = 'Perfect! Slot is reserved. ✅ A WhatsApp confirmation ticket and SMS directions have been sent to your phone.'
          nextReplies = [
            { text: 'Awesome, thanks!', nextState: 'reset' },
            { text: 'Main menu 📋', nextState: 'reset' },
          ]
          break
        case 'generate_video':
          aiText = 'Yes, absolutely! 🎥 I can generate reels, ad clips, and explainers. What product style should we generate right now?'
          nextReplies = [
            { text: 'Smart Watch (Gym style) ⌚', nextState: 'render_video' },
            { text: 'Coffee Mug (Office style) ☕', nextState: 'render_video' },
          ]
          break
        case 'render_video':
          aiText = 'Generating frames... 🎨 AI Render engine running. Video demo completed! 🎬 I\'ve uploaded the video file to your dashboard.'
          nextReplies = [
            { text: 'View Dashboard 📊', nextState: 'go_dashboard' },
            { text: 'Main menu 📋', nextState: 'reset' },
          ]
          break
        case 'go_dashboard':
          aiText = 'Click the link in the sidebar or go to the `/dashboard` page to review all generated metrics, activity feeds, and assets! 📊'
          nextReplies = [
            { text: 'Main menu 📋', nextState: 'reset' },
          ]
          break
        case 'reset_with_thanks':
          aiText = 'Priority order placed! 🚀 Total: ₹45. Thank you for choosing ZapFlow automation.'
          nextReplies = mainOptions
          break
        case 'reset':
        default:
          aiText = 'How else can I assist you? Select another scenario to see more AI capabilities!'
          nextReplies = mainOptions
          break
      }

      setShowTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: 'ai' as const, text: aiText },
      ])
      setOptions(nextReplies)
    }, 1200)
  }

  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl text-ink font-bold mb-4">
          see it in action
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Try our interactive WhatsApp demo. Click an option below to test the AI agent's responses.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto max-w-sm"
      >
        {/* Phone frame */}
        <div className="rounded-[2.2rem] border border-black/10 shadow-2xl bg-white p-1 overflow-hidden">
          {/* Phone top bar */}
          <div className="bg-ink rounded-t-[1.95rem] px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#9fff00">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">ZapFlow AI Agent</p>
              <p className="text-white/50 text-xs">online</p>
            </div>
          </div>

          {/* Chat area */}
          <div className="bg-[#f0f2f5] h-[360px] px-3 py-4 flex flex-col gap-2.5 overflow-y-auto scrollbar-thin">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2 text-[13px] leading-relaxed shadow-sm ${
                      msg.sender === 'customer'
                        ? 'bg-brand-green/30 text-ink rounded-2xl rounded-br-none font-medium'
                        : 'bg-white text-ink rounded-2xl rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {showTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <TypingIndicator />
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Options area & inputs */}
          <div className="bg-white px-3 py-4 border-t border-black/5 rounded-b-[1.95rem]">
            {/* Quick replies selector */}
            <div className="flex flex-col gap-1.5 mb-3 max-h-36 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {options.map((opt) => (
                  <motion.button
                    key={opt.text}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    onClick={() => handleOptionClick(opt)}
                    className="w-full text-left bg-zinc-50 border border-black/[0.05] hover:bg-brand-green/10 hover:border-brand-green/30 text-ink text-[12px] px-3.5 py-2 rounded-xl transition-all duration-200"
                  >
                    {opt.text}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Text input footer */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-zinc-100 rounded-full px-4 py-2 text-xs text-zinc-400">
                Choose an option to chat...
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2.5L13 7l-5 4.5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
