import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Features from '../components/Features'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Features | Nexora</title>
      </Head>
      <Header />
      <main className="py-12">
        <Features />
      </main>
      <Footer />
    </div>
  )
}
