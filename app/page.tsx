'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Preloader from '@/components/ui/preloader'

// Module-level flag — survives client-side navigation, resets on hard refresh
let hasShownPreloader = false

const SpiralAnimation = dynamic(
  () => import('@/components/ui/spiral-animation').then((m) => m.SpiralAnimation),
  { ssr: false }
)

export default function LandingPage() {
  // Snapshot at mount time — if we've been here before, skip the preloader
  const [skipPreloader] = useState(() => hasShownPreloader)
  const [preloaderDone, setPreloaderDone] = useState(() => hasShownPreloader)
  const [nameVisible, setNameVisible] = useState(() => hasShownPreloader)
  const [exiting, setExiting] = useState(false)
  const navigatingRef = useRef(false)
  const router = useRouter()

  // Fires the moment the preloader starts its exit slide —
  // spiral and name are ready before the curtain rises
  const handleExitStart = useCallback(() => {
    setPreloaderDone(true)
    setNameVisible(true)
  }, [])

  const handlePreloaderComplete = useCallback(() => {
    hasShownPreloader = true
  }, [])

  const navigateForward = useCallback(() => {
    if (navigatingRef.current) return
    navigatingRef.current = true
    setExiting(true)
    setTimeout(() => router.push('/portfolio'), 700)
  }, [router])

  // Prefetch portfolio page JS + preload heavy assets while preloader plays
  useEffect(() => {
    router.prefetch('/portfolio')
    const img = new window.Image()
    img.src = '/dev/energy-meme.jpeg'
  }, [router])

  useEffect(() => {
    if (!preloaderDone) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 20) navigateForward() }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [preloaderDone, navigateForward])

  useEffect(() => {
    if (!preloaderDone) return
    let startY = 0
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (startY - e.changedTouches[0].clientY > 50) navigateForward()
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [preloaderDone, navigateForward])

  return (
    <>
      {!skipPreloader && (
        <Preloader onExitStart={handleExitStart} onComplete={handlePreloaderComplete} />
      )}

      <div
        className={`fixed inset-0 w-full h-full overflow-hidden bg-black transition-opacity duration-700 ${
          exiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0">
          <SpiralAnimation ready={preloaderDone} />
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none ${
            nameVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-6">Portfolio</p>
          <h1
            className="text-white/70 text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-center"
            style={{ lineHeight: 0.85 }}
          >
            Rohit
            <br />
            Kagitha
          </h1>
          <p className="text-white/45 text-sm sm:text-base tracking-[0.35em] uppercase mt-8 font-light">
            Backend Developer
          </p>
        </div>

        {nameVisible && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 animate-fade-in-long">
            <p className="text-white/30 text-xs tracking-[0.25em] uppercase">Scroll</p>
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1L6 6L11 1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
