import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-sage-900 bg-sage-950 py-16 text-cream-50 md:py-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">NEXORA</h3>
            <p className="text-cream-300 text-sm">
              A straightforward space for planning, focus, and learning.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-cream-50">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  AI Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-cream-50">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-cream-50">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sage-200 text-sm hover:text-marigold-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-cream-400 text-sm">
            © {currentYear} Nexora. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sage-300 hover:text-marigold-200 transition-colors">
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sage-300 hover:text-marigold-200 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sage-300 hover:text-marigold-200 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
