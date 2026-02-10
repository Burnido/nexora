import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Solutions from '../components/Solutions'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <Solutions />
      </main>
      <Footer />
    </div>
  )
}
