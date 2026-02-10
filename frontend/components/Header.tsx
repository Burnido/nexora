import React, { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream-50 border-b border-navy-200">
      <nav className="container-narrow py-4 flex items-center justify-between">
        <Link href="/">
          <div className="text-2xl font-bold text-navy-950 tracking-tighter">
            NEXORA
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/solutions" className="text-navy-950 hover:opacity-60 transition-opacity text-sm font-medium">
            Solutions
          </Link>
          <Link href="/ai" className="text-navy-950 hover:opacity-60 transition-opacity text-sm font-medium">
            AI Studio
          </Link>
          <Link href="/resources" className="text-navy-950 hover:opacity-60 transition-opacity text-sm font-medium">
            Resources
          </Link>
          <Link href="/signin" className="btn text-sm">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 border border-navy-950"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-navy-200 py-4 bg-cream-50">
          <div className="container-narrow flex flex-col gap-4">
            <Link href="/solutions" className="text-navy-950 text-sm font-medium">
              Solutions
            </Link>
            <Link href="/ai" className="text-navy-950 text-sm font-medium">
              AI Studio
            </Link>
            <Link href="/resources" className="text-navy-950 text-sm font-medium">
              Resources
            </Link>
            <Link href="/signin" className="btn text-sm w-full text-center">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
