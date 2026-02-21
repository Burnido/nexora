import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const assessments = [
    {
      title: 'Dyslexia Assessment',
      subtitle: 'Ocean Depths Analysis',
      description: 'Advanced reading pattern recognition through immersive oceanic environments',
      tags: ['Pattern Recognition', 'Visual Processing', 'Reading Fluency'],
      icon: '🧠',
      link: 'https://dsylexia-final.vercel.app/',
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Dyscalculia Assessment',
      subtitle: 'Sweet Logic Paradise',
      description: 'Mathematical reasoning through gamified candy-themed challenges',
      tags: ['Number Sense', 'Mathematical Logic', 'Spatial Reasoning'],
      icon: '🍭',
      link: 'https://dyscalculia-screening-game.vercel.app/',
      color: 'from-pink-600 to-pink-400',
    },
    {
      title: 'Dysgraphia Assessment',
      subtitle: 'Cosmic Writing Mission',
      description:
        'AI-powered handwriting analysis in a galactic setting to detect writing challenges',
      tags: ['Motor Coordination', 'Writing Fluency', 'Letter Shape & Stroke Detection'],
      icon: '🚀',
      link: 'https://dysgraphia-screening-test-eci3.vercel.app/',
      color: 'from-orange-600 to-orange-400',
    },
    {
      title: 'ADHD Assessment',
      subtitle: 'Attention Control Matrix',
      description: 'Attention and focus measurement through dynamic space missions',
      tags: ['Focus Control', 'Impulse Management', 'Task Switching'],
      icon: '⚡',
      link: 'https://adhd-eta.vercel.app/',
      color: 'from-yellow-600 to-yellow-400',
    },
  ]

  return (
    <div className="min-h-screen bg-navy-950">
      <Header />
      <main>
        {/* Assessments Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-navy-950 to-navy-900">
          <div className="container-narrow">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Learning Assessments
              </h2>
              <p className="text-xl text-navy-200 max-w-2xl mx-auto">
                Discover your learning profile with our interactive assessment tools
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {assessments.map((assessment, index) => (
                <a
                  key={index}
                  href={assessment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-navy-500 to-navy-700 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-navy-800 border border-navy-700 p-8 rounded-lg hover:border-navy-500 transition-all duration-300 h-full cursor-pointer">
                    {/* Icon */}
                    <div
                      className={`text-5xl mb-6 inline-block p-4 rounded-lg bg-gradient-to-br ${assessment.color} text-white`}
                    >
                      {assessment.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-navy-200 transition-colors">
                      {assessment.title}
                    </h3>
                    <p className="text-sm text-navy-400 mb-3 font-semibold">
                      {assessment.subtitle}
                    </p>
                    <p className="text-navy-300 mb-6 text-sm">{assessment.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {assessment.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-navy-700 text-navy-200 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Button */}
                    <button className="w-full py-4 bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-500 hover:to-navy-600 text-white font-bold rounded-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
                      Begin Assessment ✨
                    </button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
