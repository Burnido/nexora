import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function GamesHub() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Head>
        <title>Games | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.25em] text-navy-500 mb-4">Games</p>
          <h1 className="text-display text-navy-950 mb-4">One working game for now</h1>
          <p className="text-lg text-navy-700 mb-12 max-w-2xl">
            This page is the game hub. Right now it connects to the Dot Counting Game so you can
            test the flow end to end.
          </p>

          <Link href="/games/dot-counting" className="block group">
            <div className="border border-navy-200 bg-white p-8 md:p-10 hover:border-navy-950 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-fuchsia-600 text-white text-3xl mb-6">
                🍬
              </div>
              <h2 className="text-3xl font-bold text-navy-950 mb-2">Dot Counting Game</h2>
              <p className="text-navy-700 mb-6 max-w-xl">
                Count the dots shown on screen, pick the right number, and advance through the
                rounds.
              </p>
              <span className="btn group-hover:translate-x-1 transition-transform inline-flex">
                Play Dot Counting
              </span>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
