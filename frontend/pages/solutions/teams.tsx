import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function TeamsSolution() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Nexora for Teams | Inclusive Workspaces</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-4xl mx-auto">
        <span className="text-xs font-mono tracking-widest text-fuchsia-400 uppercase bg-fuchsia-950 px-3 py-1 rounded-full border border-fuchsia-800">
          NEUROINCLUSIVE TEAMWORK
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-6">Empower Every Mind on Your Team</h1>
        <p className="text-xl text-navy-200 mb-12 leading-relaxed font-light">
          Create collaborative workflows that respect focus preferences, asynchronous communication, and clear deliverables.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-navy-900 border border-navy-800 rounded-xl">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold mb-2">Asynchronous Check-ins</h3>
            <p className="text-navy-300 text-sm">Status updates without disruptive meetings or micro-management.</p>
          </div>

          <div className="p-6 bg-navy-900 border border-navy-800 rounded-xl">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Team Capacity Matrix</h3>
            <p className="text-navy-300 text-sm">Visual balance indicators to avoid burn-out and overload.</p>
          </div>
        </div>

        <Link
          href="/signup"
          className="inline-block px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-fuchsia-500/20"
        >
          Request Team Demo →
        </Link>
      </main>
      <Footer />
    </div>
  )
}
