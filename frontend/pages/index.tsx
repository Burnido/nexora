import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Features from '../components/Features'
import Solutions from '../components/Solutions'

const ScrollVideoHero = dynamic(() => import('../components/ScrollVideoHero'), {
  ssr: false,
})

export default function Home() {
  const games = [
    {
      title: 'Dyscalculia Assessment',
      subtitle: 'Dot Counting & Sweet Logic',
      description: 'Mathematical reasoning and quick number-sense evaluation through interactive dot challenges.',
      tags: ['Number Sense', 'Math Logic', 'Spatial Awareness'],
      icon: '🍬',
      link: '/games/dot-counting',
      color: 'from-fuchsia-600 to-rose-500',
    },
    {
      title: 'Dyslexia Assessment',
      subtitle: 'Ocean Depths Analysis',
      description: 'Advanced reading pattern recognition and visual processing through deep sea exploration.',
      tags: ['Visual Processing', 'Reading Fluency', 'Pattern Sense'],
      icon: '🌊',
      link: '/games/ocean-explorer',
      color: 'from-sky-500 to-indigo-600',
    },
    {
      title: 'Dysgraphia Assessment',
      subtitle: 'Cosmic Writing Mission',
      description: 'AI-assisted handwriting stroke & letter shape analysis set in a galactic setting.',
      tags: ['Motor Control', 'Writing Fluency', 'Stroke Accuracy'],
      icon: '🚀',
      link: '/assessment',
      color: 'from-amber-500 to-pink-500',
    },
    {
      title: 'ADHD Focus Assessment',
      subtitle: 'Attention Control Matrix',
      description: 'Dynamic focus measurement, impulse control tracking, and cognitive task breakdown.',
      tags: ['Attention Control', 'Impulse Management', 'Task Switching'],
      icon: '⚡',
      link: '/ai',
      color: 'from-emerald-400 to-teal-600',
    },
  ]

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans selection:bg-fuchsia-500 selection:text-white">
      <Head>
        <title>Nexora | 3D Scroll & AI-Powered ADHD Platform</title>
        <meta
          name="description"
          content="Nexora helps neurodivergent individuals master focus, build habits, and complete tasks with interactive 3D scroll visuals and AI tools."
        />
      </Head>

      <Header />

      <main>
        {/* 3D SCROLL VIDEO HERO SECTION */}
        <ScrollVideoHero />

        {/* LEARNING GAMES SHOWCASE SECTION */}
        <section id="games" className="py-24 md:py-32 bg-navy-950 border-t border-navy-800">
          <div className="container-narrow px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-widest text-sky-400 uppercase bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
                INTERACTIVE COGNITIVE SUITE
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
                Gamified Learning & Assessments
              </h2>
              <p className="text-lg text-navy-300 max-w-2xl mx-auto font-light">
                Discover your cognitive strengths with scientifically styled, engaging gamified missions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="group relative bg-navy-900/90 border border-navy-800 hover:border-sky-500/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`text-4xl mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${game.color} text-white shadow-lg`}
                    >
                      {game.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-sky-400 font-mono mb-3">{game.subtitle}</p>
                    <p className="text-navy-300 text-sm mb-6 leading-relaxed">{game.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {game.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-navy-800 text-navy-300 text-xs rounded-full border border-navy-700 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={game.link}
                    className="w-full py-3.5 bg-navy-800 hover:bg-gradient-to-r hover:from-sky-500 hover:to-fuchsia-600 text-white font-bold rounded-xl transition-all duration-300 text-center block shadow-md group-hover:shadow-sky-500/20"
                  >
                    Play Now ✨
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
