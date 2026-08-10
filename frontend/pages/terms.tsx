import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Terms of Service | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-4xl mx-auto leading-relaxed">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-navy-300 mb-6">Last updated: February 2026</p>
        <div className="space-y-6 text-navy-200">
          <p>By accessing or using Nexora, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Use of Services</h2>
          <p>
            Nexora provides task management and cognitive learning tools for personal and
            educational support. Our tools do not constitute medical advice or clinical diagnosis.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Account Responsibility</h2>
          <p>
            You are responsible for keeping your login credentials secure and for any activity under
            your account.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
