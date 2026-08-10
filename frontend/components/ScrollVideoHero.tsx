import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Card data ──────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'overview',
    centerProgress: 0.05,
    borderCls: 'border-slate-700/60',
    shadowCls: 'shadow-[0_0_60px_rgba(0,0,0,0.7)]',
    content: (scrollTo: (p: number) => void) => (
      <div className="w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-widest uppercase mb-6">
          🧠 COGNITIVE DIAGNOSTIC SUITE
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Explore Your{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-fuchsia-400 to-amber-300">
            Neurodivergent Rhythm
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-light max-w-md mx-auto">
          Scroll down or select a tab above to journey through neural pathways — synced in real-time to the video.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { icon: '🍬', label: 'Dyscalculia', p: 0.23 },
            { icon: '🌊', label: 'Dyslexia',    p: 0.43 },
            { icon: '🚀', label: 'Dysgraphia',  p: 0.63 },
            { icon: '⚡', label: 'ADHD Focus',  p: 0.83 },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => scrollTo(t.p)}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-sky-400 animate-bounce">
          SCROLL TO BEGIN ↓
        </div>
      </div>
    ),
  },
  {
    id: 'dyscalculia',
    centerProgress: 0.23,
    borderCls: 'border-fuchsia-500/50',
    shadowCls: 'shadow-[0_0_60px_rgba(217,70,239,0.3)]',
    content: () => (
      <div className="w-full text-left relative">
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-fuchsia-600 to-rose-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/10 border border-white/10 rounded-full text-slate-200">01 / 04 • MATHEMATICAL REASONING</span>
          <span className="text-xs font-mono text-slate-400">STEP 1 OF 4</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-rose-500 flex items-center justify-center text-3xl shadow-lg shrink-0">🍬</div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Dyscalculia Assessment</h2>
            <p className="text-xs font-mono text-fuchsia-400 font-semibold">Dot Counting & Sweet Logic</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-5 leading-relaxed font-light">Mathematical reasoning and number-sense evaluation through interactive dot challenges.</p>
        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl bg-black/40 border border-white/10">
          {[['Math Logic','98%','text-fuchsia-400'],['Spatial','92%','text-rose-400'],['Latency','4.2ms','text-pink-300']].map(([l,v,c])=>(
            <div key={l} className="text-center"><div className="text-[10px] font-mono text-slate-400 uppercase">{l}</div><div className={`text-sm font-extrabold font-mono ${c}`}>{v}</div></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">{['Number Sense','Math Logic','Spatial Awareness'].map(t=>(<span key={t} className="px-3 py-1 bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs rounded-full font-medium">{t}</span>))}</div>
        <Link href="/games/dot-counting" className="w-full py-3.5 bg-gradient-to-r from-fuchsia-600 to-rose-500 hover:opacity-90 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg text-base hover:scale-[1.02] active:scale-[0.98] transition-all">Play Now ✨</Link>
      </div>
    ),
  },
  {
    id: 'dyslexia',
    centerProgress: 0.43,
    borderCls: 'border-sky-400/50',
    shadowCls: 'shadow-[0_0_60px_rgba(56,189,248,0.3)]',
    content: () => (
      <div className="w-full text-left relative">
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-sky-400 to-blue-600 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/10 border border-white/10 rounded-full text-slate-200">02 / 04 • READING FLUENCY</span>
          <span className="text-xs font-mono text-slate-400">STEP 2 OF 4</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-3xl shadow-lg shrink-0">🌊</div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Dyslexia Assessment</h2>
            <p className="text-xs font-mono text-sky-400 font-semibold">Ocean Depths Analysis</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-5 leading-relaxed font-light">Advanced reading pattern recognition and visual processing through deep sea exploration.</p>
        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl bg-black/40 border border-white/10">
          {[['Visual','95%','text-sky-400'],['Phonological','89%','text-blue-400'],['Tracking','96%','text-indigo-300']].map(([l,v,c])=>(
            <div key={l} className="text-center"><div className="text-[10px] font-mono text-slate-400 uppercase">{l}</div><div className={`text-sm font-extrabold font-mono ${c}`}>{v}</div></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">{['Visual Processing','Reading Fluency','Pattern Sense'].map(t=>(<span key={t} className="px-3 py-1 bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs rounded-full font-medium">{t}</span>))}</div>
        <Link href="/games/ocean-explorer" className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-blue-600 hover:opacity-90 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg text-base hover:scale-[1.02] active:scale-[0.98] transition-all">Play Now ✨</Link>
      </div>
    ),
  },
  {
    id: 'dysgraphia',
    centerProgress: 0.63,
    borderCls: 'border-amber-400/50',
    shadowCls: 'shadow-[0_0_60px_rgba(251,191,36,0.3)]',
    content: () => (
      <div className="w-full text-left relative">
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-amber-400 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/10 border border-white/10 rounded-full text-slate-200">03 / 04 • MOTOR COORDINATION</span>
          <span className="text-xs font-mono text-slate-400">STEP 3 OF 4</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-3xl shadow-lg shrink-0">🚀</div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Dysgraphia Assessment</h2>
            <p className="text-xs font-mono text-amber-400 font-semibold">Cosmic Writing Mission</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-5 leading-relaxed font-light">AI-assisted handwriting stroke & letter shape analysis in a galactic setting.</p>
        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl bg-black/40 border border-white/10">
          {[['Motor','91%','text-amber-400'],['Stroke','94%','text-orange-400'],['Spatial','93%','text-pink-300']].map(([l,v,c])=>(
            <div key={l} className="text-center"><div className="text-[10px] font-mono text-slate-400 uppercase">{l}</div><div className={`text-sm font-extrabold font-mono ${c}`}>{v}</div></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">{['Motor Control','Writing Fluency','Stroke Accuracy'].map(t=>(<span key={t} className="px-3 py-1 bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs rounded-full font-medium">{t}</span>))}</div>
        <Link href="/assessment" className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-pink-500 hover:opacity-90 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg text-base hover:scale-[1.02] active:scale-[0.98] transition-all">Play Now ✨</Link>
      </div>
    ),
  },
  {
    id: 'adhd',
    centerProgress: 0.83,
    borderCls: 'border-emerald-400/50',
    shadowCls: 'shadow-[0_0_60px_rgba(52,211,153,0.3)]',
    content: () => (
      <div className="w-full text-left relative">
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/10 border border-white/10 rounded-full text-slate-200">04 / 04 • ATTENTION & EXECUTIVE</span>
          <span className="text-xs font-mono text-slate-400">STEP 4 OF 4</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl shadow-lg shrink-0">⚡</div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">ADHD Focus Assessment</h2>
            <p className="text-xs font-mono text-emerald-400 font-semibold">Attention Control Matrix</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-5 leading-relaxed font-light">Dynamic focus measurement, impulse control tracking, and cognitive task breakdown.</p>
        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl bg-black/40 border border-white/10">
          {[['Attention','97%','text-emerald-400'],['Impulse','93%','text-teal-400'],['Executive','95%','text-cyan-300']].map(([l,v,c])=>(
            <div key={l} className="text-center"><div className="text-[10px] font-mono text-slate-400 uppercase">{l}</div><div className={`text-sm font-extrabold font-mono ${c}`}>{v}</div></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">{['Attention Control','Impulse Management','Task Switching'].map(t=>(<span key={t} className="px-3 py-1 bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs rounded-full font-medium">{t}</span>))}</div>
        <Link href="/ai" className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-90 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg text-base hover:scale-[1.02] active:scale-[0.98] transition-all">Play Now ✨</Link>
      </div>
    ),
  },
  {
    id: 'summary',
    centerProgress: 0.97,
    borderCls: 'border-emerald-500/50',
    shadowCls: 'shadow-[0_0_60px_rgba(16,185,129,0.25)]',
    content: () => (
      <div className="w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-6">✨ ALL 4 ASSESSMENTS COMPLETED</div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Ready to Start Your{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Cognitive Journey?</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-light">Create your account to unlock continuous focus tracking & AI feedback.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-lg transition-all hover:scale-105">Create Free Account</Link>
          <Link href="/games" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl transition-all hover:scale-105">View All Games</Link>
        </div>
      </div>
    ),
  },
]

const NAV_TABS = [
  { label: 'Overview',     icon: '🧠', p: 0.05 },
  { label: 'Dyscalculia',  icon: '🍬', p: 0.23 },
  { label: 'Dyslexia',     icon: '🌊', p: 0.43 },
  { label: 'Dysgraphia',   icon: '🚀', p: 0.63 },
  { label: 'ADHD',         icon: '⚡', p: 0.83 },
  { label: 'Summary',      icon: '✨', p: 0.97 },
]

function smoothstep(x: number) {
  const c = Math.max(0, Math.min(1, x))
  return c * c * (3 - 2 * c)
}

export default function ScrollVideoHero() {
  const sectionRef     = useRef<HTMLDivElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const hudPercentRef  = useRef<HTMLSpanElement>(null)
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([])
  const tabPillRef     = useRef<HTMLDivElement>(null)
  const tabBtnRefs     = useRef<(HTMLButtonElement | null)[]>([])
  const dotRefs        = useRef<(HTMLDivElement | null)[]>([])

  // Live animation state in refs — zero React re-renders in hot path
  const rawProgress    = useRef(0)
  const spProgress     = useRef(0)
  const videoSmooth    = useRef(0)
  const pillX          = useRef(0)

  const scrollToTab = (targetP: number) => {
    const section = sectionRef.current
    if (!section) return
    const top   = window.scrollY + section.getBoundingClientRect().top
    const total = section.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + targetP * total, behavior: 'smooth' })
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Warm up the video decoder immediately on mount
    video.play().then(() => video.pause()).catch(() => {})

    // ── SCROLL LISTENER — passive raw progress ───────────────────────────
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect  = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      rawProgress.current = Math.max(0, Math.min(1, -rect.top / total))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ── 60 FPS RAF LOOP — Instant load, smooth video scrub & card animations ───
    let raf: number

    const loop = () => {
      // 1 ─ Inertia spring for scroll progress (0.075 = responsive, buttery smooth)
      const pDiff = rawProgress.current - spProgress.current
      spProgress.current += pDiff * 0.075
      const sp = spProgress.current

      // 2 ─ Video scrub interpolation (only seek if not currently seeking to prevent decoder lockup)
      if (video.duration && !isNaN(video.duration)) {
        const targetTime = sp * video.duration
        const vDiff = targetTime - videoSmooth.current
        videoSmooth.current += vDiff * 0.12

        if (!video.seeking && Math.abs(video.currentTime - videoSmooth.current) > 0.02) {
          try {
            const v = video as any
            if (typeof v.fastSeek === 'function') v.fastSeek(videoSmooth.current)
            else video.currentTime = videoSmooth.current
          } catch (_) {}
        }
      }

      // 3 ─ Progress bar
      if (progressBarRef.current)
        progressBarRef.current.style.width = `${sp * 100}%`

      // 4 ─ HUD percentage text
      if (hudPercentRef.current)
        hudPercentRef.current.textContent = `${Math.round(sp * 100)}%`

      // 5 ─ Cards: drive opacity + transform + blur via smoothstep
      const WINDOW = 0.17
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const center = CARDS[i].centerProgress
        const dist   = Math.abs(sp - center)

        if (dist >= WINDOW) {
          if (el.style.opacity !== '0') {
            el.style.opacity       = '0'
            el.style.transform     = `translateY(${sp < center ? 42 : -42}px) scale(0.90)`
            el.style.filter        = 'blur(18px)'
            el.style.pointerEvents = 'none'
            el.style.display       = 'none'
          }
          return
        }

        el.style.display = 'block'
        const norm  = 1 - dist / WINDOW
        const ease  = smoothstep(norm)
        const blur  = (1 - ease) * 18
        const yOff  = (1 - ease) * (sp < center ? 38 : -38)
        const scale = 0.90 + ease * 0.10

        el.style.opacity       = String(Math.pow(ease, 1.0))
        el.style.transform     = `translateY(${yOff.toFixed(2)}px) scale(${scale.toFixed(4)})`
        el.style.filter        = blur < 0.4 ? 'none' : `blur(${blur.toFixed(2)}px)`
        el.style.pointerEvents = ease > 0.45 ? 'auto' : 'none'
      })

      // 6 ─ Tab pill sliding spring
      const activeIdx = NAV_TABS.reduce((best, t, i) =>
        Math.abs(t.p - sp) < Math.abs(NAV_TABS[best].p - sp) ? i : best, 0)

      const pill      = tabPillRef.current
      const activeBtn = tabBtnRefs.current[activeIdx]
      if (pill && activeBtn) {
        const btnRect    = activeBtn.getBoundingClientRect()
        const pillParent = pill.parentElement!.getBoundingClientRect()
        const targetX    = btnRect.left - pillParent.left
        pillX.current   += (targetX - pillX.current) * 0.16
        pill.style.width     = `${btnRect.width}px`
        pill.style.height    = `${btnRect.height}px`
        pill.style.transform = `translateX(${pillX.current.toFixed(2)}px)`
      }

      // 7 ─ Tab button text brightness
      tabBtnRefs.current.forEach((btn, i) => {
        if (!btn) return
        btn.style.color = i === activeIdx ? '#fff' : 'rgba(148,163,184,0.65)'
      })

      // 8 ─ Bottom dot states
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        if (i === activeIdx) {
          dot.style.background = 'rgb(56,189,248)'
          dot.style.transform  = 'scale(1.4)'
          dot.style.boxShadow  = '0 0 14px rgba(56,189,248,0.95)'
        } else if (i < activeIdx) {
          dot.style.background = 'rgb(52,211,153)'
          dot.style.transform  = 'scale(1)'
          dot.style.boxShadow  = 'none'
        } else {
          dot.style.background = 'rgb(51,65,85)'
          dot.style.transform  = 'scale(1)'
          dot.style.boxShadow  = 'none'
        }
      })

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[700vh] bg-[#02050e] text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── DIRECT HIGH-PERFORMANCE VIDEO TAG (Instant Load, Zero Preloader) ── */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          suppressHydrationWarning
          className="absolute inset-0 w-full h-full object-cover filter contrast-110 saturate-110 brightness-105"
        />

        {/* ── CINEMATIC VIGNETTE ────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050e] via-[#02050e]/20 to-[#02050e]/55 pointer-events-none" />

        {/* ── SCROLL PROGRESS BAR ───────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900/70 z-50">
          <div
            ref={progressBarRef}
            style={{ width: '0%', willChange: 'width' }}
            className="h-full bg-gradient-to-r from-fuchsia-500 via-sky-400 to-emerald-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]"
          />
        </div>

        {/* ── TOP NAV TABS HUD ──────────────────────────────────────────── */}
        <div className="hero-hud-intro absolute top-5 left-0 right-0 z-50 flex justify-center px-4">
          <div className="relative bg-[#050c1e]/80 border border-white/15 backdrop-blur-2xl p-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center gap-1 no-scrollbar overflow-x-auto">
            <div
              ref={tabPillRef}
              style={{
                position: 'absolute',
                top: '6px',
                left: '6px',
                height: 'calc(100% - 12px)',
                width: '80px',
                transform: 'translateX(0)',
                willChange: 'transform, width',
              }}
              className="rounded-full bg-gradient-to-r from-sky-500/80 via-fuchsia-500/70 to-emerald-500/80 border border-white/30 shadow-[0_0_22px_rgba(56,189,248,0.5)]"
            />
            {NAV_TABS.map((tab, i) => (
              <button
                key={tab.label}
                ref={(el) => { tabBtnRefs.current[i] = el }}
                onClick={() => scrollToTab(tab.p)}
                style={{ color: 'rgba(148,163,184,0.65)', transition: 'color 0.2s' }}
                className="relative z-10 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 shrink-0 cursor-pointer focus:outline-none"
              >
                <span className="text-sm">{tab.icon}</span>
                <span className="font-mono hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── PROGRESS HUD ──────────────────────────────────────────────── */}
        <div className="hero-hud-intro absolute top-[72px] right-5 z-40 hidden md:flex items-center gap-2 bg-[#050c1e]/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-amber-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          NEURAL DEPTH: <span ref={hudPercentRef}>0%</span>
        </div>

        {/* ── ALL CARDS (always in DOM, RAF drives visibility) ──────────── */}
        <div className="relative z-30 px-6 w-full max-w-xl mx-auto flex items-center justify-center min-h-[540px] pt-14 sm:pt-0">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: 0,
                opacity: 0,
                transform: 'translateY(42px) scale(0.90)',
                filter: 'blur(18px)',
                pointerEvents: 'none',
                display: i === 0 ? 'block' : 'none',
                willChange: 'transform, opacity, filter',
              }}
              className={`w-full bg-[#050c1e]/70 backdrop-blur-xl p-7 sm:p-9 rounded-3xl overflow-hidden ${card.borderCls} ${card.shadowCls}`}
            >
              {card.content(scrollToTab)}
            </div>
          ))}
        </div>

        {/* ── BOTTOM DOT NAV ────────────────────────────────────────────── */}
        <div className="hero-hud-intro absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-[#050c1e]/80 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-xl">
          <span className="text-[10px] font-mono text-slate-500 mr-1 hidden sm:inline">STAGE:</span>
          {NAV_TABS.map((tab, i) => (
            <button
              key={tab.label}
              title={tab.label}
              onClick={() => scrollToTab(tab.p)}
              className="focus:outline-none"
            >
              <div
                ref={(el) => { dotRefs.current[i] = el }}
                style={{
                  width: 12, height: 12,
                  borderRadius: '50%',
                  background: 'rgb(51,65,85)',
                  transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                  willChange: 'transform, background',
                }}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
