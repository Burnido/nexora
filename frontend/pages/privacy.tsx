import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Privacy Policy | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-4xl mx-auto leading-relaxed">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-navy-300 mb-6">Last updated: February 2026</p>
        <div className="space-y-6 text-navy-200">
          <p>At Nexora, your privacy and cognitive data protection are our highest priority. We never sell or expose your personal habits, focus statistics, or assessment scores to third parties.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect essential account details (email, encrypted credentials) and optional habit tracking preferences to personalize your AI focus insights.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Data Security</h2>
          <p>All data in transit and at rest is protected with enterprise-grade AES-256 encryption.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
