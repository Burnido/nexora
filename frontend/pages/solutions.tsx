import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Solutions from '../components/Solutions'

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Solutions | Nexora</title>
      </Head>
      <Header />
      <main className="py-12">
        <Solutions />
      </main>
      <Footer />
    </div>
  )
}
