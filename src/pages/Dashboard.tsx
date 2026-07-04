import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

/* ─── Demo Data ─── */
const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  leads: Math.floor(Math.random() * 40 + 20 + i * 1.5),
  calls: Math.floor(Math.random() * 30 + 15 + i * 1.2),
}))

const metricCards = [
  { label: 'Total Leads', value: 847, prefix: '', suffix: '' },
  { label: 'Calls Handled', value: 1234, prefix: '', suffix: '' },
  { label: 'Conversion Rate', value: 32, prefix: '', suffix: '%' },
  { label: 'Avg ROI', value: 4.2, prefix: '', suffix: 'x' },
]

const recentActivity = [
  { action: 'AI Agent called Lead #234', result: 'Booked ✅', time: '2 min ago' },
  { action: 'WhatsApp bot resolved Query #891', result: 'Resolved ✅', time: '5 min ago' },
  { action: 'AI Agent called Lead #189', result: 'Callback scheduled', time: '12 min ago' },
  { action: 'Voice Agent qualified Lead #456', result: 'Hot lead 🔥', time: '18 min ago' },
  { action: 'Content agent drafted Blog #12', result: 'Pending review', time: '25 min ago' },
  { action: 'AI Agent called Lead #312', result: 'Booked ✅', time: '31 min ago' },
]

const sidebarItems = [
  { icon: '📊', label: 'Overview', active: true },
  { icon: '📞', label: 'Calls', active: false },
  { icon: '💬', label: 'Chats', active: false },
  { icon: '📝', label: 'Content', active: false },
  { icon: '👥', label: 'Leads', active: false },
  { icon: '⚙️', label: 'Settings', active: false },
]

/* ─── CountUp ─── */
function CountUp({ target, inView, decimals = 0 }: { target: number; inView: boolean; decimals?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const stepTime = 16
    const totalSteps = duration / stepTime
    const increment = target / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [inView, target, decimals])

  return <span>{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}</span>
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const metricsRef = useRef<HTMLDivElement>(null)
  const metricsInView = useInView(metricsRef, { once: true })

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        } bg-white/70 backdrop-blur-xl border-r border-black/5 flex-shrink-0 transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path
                d="M16 2L4 16h8l-2 10 12-14h-8l2-10z"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="6" r="1.5" fill="#9fff00" />
              <circle cx="22" cy="22" r="1.5" fill="#9fff00" />
            </svg>
            {sidebarOpen && (
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                zapflow
              </span>
            )}
          </Link>

          {/* Nav items */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  item.active
                    ? 'bg-brand-green/10 text-ink font-medium'
                    : 'text-zinc-500 hover:bg-black/[0.03] hover:text-ink'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-bg-base/80 backdrop-blur-lg border-b border-black/5 px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-9 h-9 rounded-lg border border-black/5 flex items-center justify-center hover:bg-white/60 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 4h12M2 8h12M2 12h12" />
              </svg>
            </button>
            <h1 className="font-display text-xl font-semibold text-ink">Dashboard</h1>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-brand-green/10 text-xs font-medium text-ink px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse-green" />
            demo data
          </span>
        </header>

        <div className="p-6 md:p-10 space-y-8">
          {/* Metric cards */}
          <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-sm text-zinc-500 mb-1">{m.label}</p>
                <p className="font-display text-3xl font-bold text-ink">
                  {m.prefix}
                  <CountUp
                    target={m.value}
                    inView={metricsInView}
                    decimals={m.label === 'Avg ROI' ? 1 : 0}
                  />
                  {m.suffix}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                30-Day Trend
              </h3>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
                  Leads
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green/40" />
                  Calls
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9fff00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9fff00" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9fff00" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#9fff00" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#8e8e8e' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e5e5' }}
                  interval={4}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#8e8e8e' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    backdropFilter: 'blur(8px)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#9fff00"
                  strokeWidth={2}
                  fill="url(#gradLeads)"
                />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#9fff0066"
                  strokeWidth={1.5}
                  fill="url(#gradCalls)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-6"
          >
            <h3 className="font-display text-lg font-semibold text-ink mb-4">
              Recent Activity
            </h3>
            <div className="space-y-2">
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/60 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                    <span className="text-sm text-ink">{a.action}</span>
                    <span className="text-xs text-zinc-400 bg-bg-base px-2 py-0.5 rounded-full">
                      {a.result}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 flex-shrink-0 ml-4">{a.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
