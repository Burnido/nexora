import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="border-b border-cream-400 bg-cream-50 py-20 md:py-28">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium text-sage-800">
            Planning, focus, and learning
          </p>
          <h1 className="text-display mb-6 max-w-2xl text-navy-950">
            A clearer way to plan your next step.
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-navy-700 md:text-xl">
            Nexora brings everyday planning tools and learning activities into one straightforward space.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="#games" className="btn">
              Explore activities
            </Link>
            <Link href="/signup" className="btn btn-outline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
