import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Contact Us | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-navy-300 mb-8">Questions, feedback, or enterprise inquiries? We are here to help.</p>

        {submitted ? (
          <div className="p-8 bg-emerald-950 border border-emerald-700 text-emerald-200 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Message Received!</h2>
            <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="space-y-6 bg-navy-900 border border-navy-800 p-8 rounded-2xl"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input required type="text" className="w-full p-3 bg-navy-950 border border-navy-700 rounded-xl text-white focus:outline-none focus:border-sky-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input required type="email" className="w-full p-3 bg-navy-950 border border-navy-700 rounded-xl text-white focus:outline-none focus:border-sky-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows={4} className="w-full p-3 bg-navy-950 border border-navy-700 rounded-xl text-white focus:outline-none focus:border-sky-500" />
            </div>

            <button type="submit" className="w-full py-4 bg-sky-500 hover:bg-sky-400 font-bold text-white rounded-xl transition-colors">
              Send Message ✨
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}
