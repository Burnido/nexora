import React from 'react'
import Link from 'next/link'

const solutions = [
  {
    title: 'For Individuals',
    description: 'Personal task management, focus tools, and habit tracking designed for individual success.',
    tag: 'Personal',
    href: '/solutions/individual',
  },
  {
    title: 'For Teams',
    description: 'Collaborative workspaces where teams can communicate, delegate, and achieve goals together.',
    tag: 'Team',
    href: '/solutions/teams',
  },
  {
    title: 'AI Studio',
    description: 'Advanced AI tools for content creation, planning, and personalized ADHD support strategies.',
    tag: 'AI',
    href: '/ai',
  },
]

export default function Solutions() {
  return (
    <section className="py-20 md:py-28 bg-cream-50">
      <div className="container-narrow">
        <h2 className="text-heading text-navy-950 mb-4">Solutions</h2>
        <p className="text-lg text-navy-700 mb-16 max-w-2xl">
          Whether you're working alone or with a team, Nexora adapts to your needs.
        </p>

        <div className="space-y-6">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={solution.href}
              className="block group border border-navy-200 p-8 hover:border-navy-950 hover:bg-navy-50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-navy-950">{solution.title}</h3>
                <span className="text-xs font-bold tracking-widest text-navy-700 border border-navy-700 px-3 py-1">
                  {solution.tag}
                </span>
              </div>
              <p className="text-navy-700 text-base mb-4">{solution.description}</p>
              <div className="text-sm font-bold text-navy-950 group-hover:ml-2 transition-all">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
