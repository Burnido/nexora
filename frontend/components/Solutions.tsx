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
    <section className="bg-cream-50 py-20 md:py-28">
      <div className="container-wide">
        <h2 className="text-heading mb-4 text-sage-950">Choose what fits</h2>
        <p className="mb-12 max-w-2xl text-base text-sage-900">
          Whether you're working alone or with a team, Nexora adapts to your needs.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group flex flex-col border border-sage-300 bg-sage-50 p-6 transition-colors hover:border-marigold-600 hover:bg-marigold-50"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-sage-950">{solution.title}</h3>
                <span className="border border-marigold-300 bg-marigold-100 px-2 py-1 text-xs text-marigold-950">
                  {solution.tag}
                </span>
              </div>
              <p className="mb-6 flex-1 text-base leading-relaxed text-sage-900">{solution.description}</p>
              <div className="text-sm font-semibold text-sage-900 group-hover:text-marigold-800">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
