import React from 'react'

const features = [
  {
    title: 'Smart Task Management',
    description: 'Break down complex tasks into manageable steps with AI assistance. Get intelligent suggestions for prioritization and scheduling.',
    icon: '📋',
  },
  {
    title: 'Focus Sessions',
    description: 'Customizable focus intervals with gentle reminders. Track your productivity patterns and optimize your work rhythm.',
    icon: '⏱️',
  },
  {
    title: 'Habit Tracking',
    description: 'Build sustainable habits with visual progress. Celebrate small wins and stay motivated on your journey.',
    icon: '✓',
  },
  {
    title: 'AI Insights',
    description: 'Machine learning analyzes your patterns. Get personalized recommendations to improve focus and productivity.',
    icon: '🧠',
  },
  {
    title: 'Distraction Blocker',
    description: 'Minimize interruptions during focus sessions. Stay on track with smart notification management.',
    icon: '🛡️',
  },
  {
    title: 'Community Support',
    description: 'Connect with others walking the same path. Share strategies, celebrate wins, and grow together.',
    icon: '👥',
  },
]

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-navy-950 text-cream-50">
      <div className="container-narrow">
        <h2 className="text-heading text-cream-50 mb-4">Powerful Features</h2>
        <p className="text-lg text-cream-300 mb-16 max-w-2xl">
          Designed from the ground up for how your brain works. Every feature is intentional, every interaction is thought through.
        </p>

        <div className="grid-cols-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-cream-200 p-8 hover:border-sage-400 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-subheading text-cream-50 mb-3">{feature.title}</h3>
              <p className="text-cream-200 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
