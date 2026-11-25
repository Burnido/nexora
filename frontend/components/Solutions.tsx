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
      <div className="container-wide">
        <h2 className="text-heading text-navy-950 mb-4">Choose what fits</h2>
        <p className="text-base text-navy-700 mb-12 max-w-2xl">
          Whether you're working alone or with a team, Nexora adapts to your needs.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group flex flex-col border border-cream-500 p-6 transition-colors hover:border-sage-700"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-navy-950">{solution.title}</h3>
                <span className="border border-cream-500 px-2 py-1 text-xs text-navy-700">
                  {solution.tag}
                </span>
              </div>
              <p className="mb-6 flex-1 text-base leading-relaxed text-navy-700">{solution.description}</p>
              <div className="text-sm font-medium text-navy-950">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
