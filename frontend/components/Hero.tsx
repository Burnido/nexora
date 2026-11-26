import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-65px)] items-center justify-center overflow-hidden bg-sage-950 px-6 py-16 text-center text-cream-50">
      <div aria-hidden="true" className="home-hero-grid pointer-events-none absolute inset-0" />

      <div className="container-wide relative flex flex-col items-center">
        <p className="mb-5 text-sm font-semibold tracking-wide text-marigold-300 md:text-base">
          Learning and focus, at your pace
        </p>
        <h1 className="mb-6 text-[clamp(4rem,13vw,9rem)] font-bold leading-none tracking-tight text-cream-50">
          Nexora
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-sage-100 md:text-2xl">
          Reimagining learning disability screening tests with AI-powered, child-friendly games.
          Scientifically inspired. Emotionally aware. Designed to detect — not intimidate.
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="#games" className="btn hero-primary">
            Explore activities
          </Link>
          <Link href="/signup" className="btn btn-outline hero-secondary">
            Create an account
          </Link>
        </div>

        <Link
          href="#games"
          className="mt-14 inline-flex flex-col items-center gap-2 text-sm text-sage-200 transition-colors hover:text-marigold-200"
        >
          <span>Scroll to explore</span>
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14m-7-7 7 7 7-7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
