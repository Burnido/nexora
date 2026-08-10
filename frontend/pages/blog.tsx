import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function BlogPage() {
  const posts = [
    {
      title: 'Understanding Executive Dysfunction & Hyperfocus',
      date: 'February 2026',
      readTime: '5 min read',
      excerpt: 'How to harness hyperfocus windows without burning out your mental reserve.',
    },
    {
      title: 'Gamified Cognitive Assessments: The Science Behind Nexora Games',
      date: 'January 2026',
      readTime: '8 min read',
      excerpt: 'Why interactive visual patterns yield clearer insights into reading and math logic.',
    },
  ]

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Head>
        <title>Blog & Insights | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nexora Journal & Research</h1>
        <p className="text-navy-300 mb-12">Insights on ADHD management, neurodivergent productivity, and cognitive tools.</p>

        <div className="space-y-6">
          {posts.map((post, idx) => (
            <article key={idx} className="p-8 bg-navy-900 border border-navy-800 rounded-2xl hover:border-sky-500 transition-colors">
              <span className="text-xs font-mono text-sky-400">{post.date} • {post.readTime}</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">{post.title}</h2>
              <p className="text-navy-300 text-sm leading-relaxed">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
