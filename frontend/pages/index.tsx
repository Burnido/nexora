import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
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

      <Header />

      <main>
        <Hero />

        <section id="games" className="scroll-mt-16 border-b border-marigold-200 bg-marigold-50 py-20 md:py-28">
          <div className="container-wide">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-marigold-800">Activities</p>
              <h2 className="text-heading mb-4 text-sage-950">
                Explore at your own pace
              </h2>
              <p className="text-base leading-relaxed text-sage-900">
                Short activities for practicing skills and exploring what works for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
              {games.map((game) => (
                <div
                  key={game.title}
                  className="flex flex-col justify-between border-t border-marigold-200 py-8 md:odd:pr-8 md:even:border-l md:even:pl-8"
                >
                  <div className="mb-6">
                    <p className="mb-3 inline-block bg-marigold-100 px-2 py-1 text-sm font-medium text-marigold-900">{game.category}</p>
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
