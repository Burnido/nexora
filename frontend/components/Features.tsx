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
    <section className="border-b border-sage-200 bg-sage-100 py-20 md:py-28">
      <div className="container-wide">
        <h2 className="text-heading mb-4 text-sage-950">Tools for everyday work</h2>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-sage-900">
          Simple ways to plan, focus, and keep moving through your day.
        </p>

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-l-4 border-sage-500 bg-cream-50 p-6 even:border-marigold-500"
            >
              <h3 className="text-lg font-semibold text-sage-950">{feature.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-sage-900">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
