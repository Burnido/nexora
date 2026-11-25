import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Solutions from '../components/Solutions'

export default function Home() {
  const games = [
    {
      title: 'Dyscalculia Assessment',
      description: 'Practice number sense and basic math reasoning with dot-counting activities.',
      category: 'Number sense',
      link: '/games/dot-counting',
    },
    {
      title: 'Dyslexia Assessment',
      description: 'Explore reading fluency and visual pattern activities at your own pace.',
      category: 'Reading',
      link: '/games/ocean-explorer',
    },
    {
      title: 'Dysgraphia Assessment',
      description: 'Try guided writing exercises and upload handwriting samples for analysis.',
      category: 'Writing',
      link: '/assessment',
    },
    {
      title: 'Focus Tools',
      description: 'Find planning and focus support in Nexora’s AI Studio.',
      category: 'Focus',
      link: '/ai',
    },
  ]

  return (
    <div className="home-page min-h-screen bg-cream-50 font-sans text-navy-950">
      <Head>
        <title>Nexora | Planning, focus, and learning</title>
        <meta
          name="description"
          content="Explore straightforward tools for planning, focus, and learning with Nexora."
        />
      </Head>

      <Header />

      <main>
        <Hero />

        <section id="games" className="border-b border-cream-400 py-20 md:py-28">
          <div className="container-wide">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium text-sage-800">Activities</p>
              <h2 className="text-heading mb-4 text-navy-950">
                Explore at your own pace
              </h2>
              <p className="text-base leading-relaxed text-navy-700">
                Short activities for practicing skills and exploring what works for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
              {games.map((game) => (
                <div
                  key={game.title}
                  className="flex flex-col justify-between border-t border-cream-400 py-8 md:odd:pr-8 md:even:border-l md:even:pl-8"
                >
                  <div className="mb-6">
                    <p className="mb-2 text-sm text-sage-800">{game.category}</p>
                    <h3 className="mb-3 text-xl font-semibold text-navy-950">
                      {game.title}
                    </h3>
                    <p className="max-w-lg text-base leading-relaxed text-navy-700">{game.description}</p>
                  </div>
                  <Link
                    href={game.link}
                    className="w-fit border-b border-sage-700 pb-1 text-sm font-medium text-navy-950 transition-colors hover:text-sage-800"
                  >
                    View activity <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <Features />

        {/* SOLUTIONS SECTION */}
        <Solutions />
      </main>

      <Footer />
    </div>
  )
}
