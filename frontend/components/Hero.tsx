import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="container-narrow">
        <div className="max-w-3xl animate-fadeIn">
          <h1 className="text-display text-navy-950 mb-6 animate-slideUp">
            Focus Better. Achieve More.
          </h1>
          <p className="text-xl text-navy-800 mb-8 leading-relaxed animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Nexora helps people with ADHD manage their tasks, build sustainable habits, and unlock their full potential with AI-powered insights and thoughtful design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <Link href="/signup" className="btn">
              Get Started Free
            </Link>
            <button className="btn btn-outline">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-navy-200">
          <div>
            <div className="text-4xl font-bold text-navy-950 mb-2">10K+</div>
            <div className="text-navy-700">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-navy-950 mb-2">50M+</div>
            <div className="text-navy-700">Tasks Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-navy-950 mb-2">4.9★</div>
            <div className="text-navy-700">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
