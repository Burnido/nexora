import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Resources() {
  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of Nexora and set up your first tasks',
      link: '#',
    },
    {
      title: 'ADHD Management Tips',
      description: 'Evidence-based strategies for managing ADHD effectively',
      link: '#',
    },
    {
      title: 'Focus Techniques',
      description: 'Pomodoro, time-blocking, and other proven focus methods',
      link: '#',
    },
    {
      title: 'Productivity Research',
      description: 'Latest studies on ADHD and productivity optimization',
      link: '#',
    },
    {
      title: 'API Documentation',
      description: 'Build integrations with the Nexora API',
      link: '#',
    },
    {
      title: 'Community Forum',
      description: 'Connect with other Nexora users and share strategies',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-28 bg-cream-50">
          <div className="container-narrow">
            <h1 className="text-display text-navy-950 mb-4">Resources</h1>
            <p className="text-lg text-navy-700 mb-16 max-w-2xl">
              Everything you need to get the most out of Nexora and manage your ADHD effectively.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.link}
                  className="block border border-navy-200 p-8 hover:border-navy-950 hover:bg-navy-50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-navy-950 mb-3">{resource.title}</h3>
                  <p className="text-navy-700 text-base">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
