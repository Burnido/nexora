import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function IndividualSolution() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Nexora for Individuals | ADHD Support</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-4xl mx-auto">
        <span className="text-xs font-mono tracking-widest text-sky-400 uppercase bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
          PERSONAL PRODUCTIVITY
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-6">Built For How Your Brain Works</h1>
        <p className="text-xl text-navy-200 mb-12 leading-relaxed font-light">
          Nexora for Individuals combines smart task breakdown, focus timers, and habit routines designed to reduce overwhelm and maintain momentum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-navy-900 border border-navy-800 rounded-xl">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">Micro-Task Splitting</h3>
            <p className="text-navy-300 text-sm">Turn daunting projects into 5-minute actionable steps automatically with AI.</p>
          </div>

          <div className="p-6 bg-navy-900 border border-navy-800 rounded-xl">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Distraction Shield</h3>
            <p className="text-navy-300 text-sm">Filter out non-essential notifications during high-focus sessions.</p>
          </div>
        </div>

        <Link
          href="/signup"
          className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20"
        >
          Start Your Free Individual Plan →
        </Link>
      </main>
      <Footer />
    </div>
  )
}
