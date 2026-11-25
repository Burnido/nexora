import React from 'react'

const features = [
  {
    title: 'Smart Task Management',
    description: 'Break larger tasks into smaller steps and organize what needs doing.',
  },
  {
    title: 'Focus Sessions',
    description: 'Set a focus interval that works for you, with gentle reminders.',
  },
  {
    title: 'Habit Tracking',
    description: 'Keep track of routines and notice your progress over time.',
  },
  {
    title: 'AI Insights',
    description: 'Get suggestions to help plan tasks and build a focus routine.',
  },
  {
    title: 'Distraction Blocker',
    description: 'Reduce interruptions during focus sessions and stay with the task at hand.',
  },
  {
    title: 'Community Support',
    description: 'Share strategies and encouragement with others working toward similar goals.',
  },
]

export default function Features() {
  return (
    <section className="border-b border-cream-400 bg-cream-100 py-20 md:py-28">
      <div className="container-wide">
        <h2 className="text-heading mb-4 text-navy-950">Tools for everyday work</h2>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-navy-700">
          Simple ways to plan, focus, and keep moving through your day.
        </p>

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-t border-cream-500 py-6"
            >
              <h3 className="text-lg font-semibold text-navy-950">{feature.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-navy-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
