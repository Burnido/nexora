import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Hero from '../components/Hero'

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
    <div className="home-page min-h-screen bg-cream-50 font-sans text-sage-950">
      <Head>
        <title>Nexora | Learning and focus tools</title>
        <meta
          name="description"
          content="Explore activities for number sense, reading, writing, and everyday focus with Nexora."
        />
      </Head>

      <main>
        <Hero />

        <section id="games" className="scroll-mt-16 bg-cream-50 py-12 md:py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {games.map((game) => (
                <div
                  key={game.title}
                  className="flex flex-col justify-between bg-sage-100 p-6 transition-colors hover:bg-sage-200 md:p-8"
                >
                  <div className="mb-6">
                    <p className="mb-3 inline-block bg-marigold-100 px-3 py-1 text-sm font-medium text-marigold-900">{game.category}</p>
                    <h3 className="mb-3 text-xl font-semibold text-sage-950">
                      {game.title}
                    </h3>
                    <p className="max-w-lg text-base leading-relaxed text-sage-900">{game.description}</p>
                  </div>
                  <Link
                    href={game.link}
                    className="w-fit border-b border-sage-700 pb-1 text-sm font-semibold text-sage-900 transition-colors hover:border-marigold-700 hover:text-marigold-800"
                  >
                    View activity <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
