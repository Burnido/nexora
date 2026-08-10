import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>About Us | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission at Nexora</h1>
        <p className="text-lg text-navy-200 leading-relaxed mb-8">
          Nexora was built with a simple conviction: neurodivergence is not a deficit to be fixed, but a unique cognitive profile to be understood, accommodated, and empowered.
        </p>
        <div className="p-8 bg-navy-900 border border-navy-800 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Why We Build Nexora</h2>
          <p className="text-navy-300 leading-relaxed">
            Traditional task managers assume linear thinking, rigid scheduling, and constant impulse control. Nexora bridges the gap with adaptive AI, gamified assessments, and soothing interactive design.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
