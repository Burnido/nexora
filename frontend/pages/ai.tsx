import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function AiStudio() {
  const tools = [
    {
      title: 'Task Planner',
      description: 'AI-powered task breakdown and scheduling assistant',
      icon: '🎯',
    },
    {
      title: 'Focus Coach',
      description: 'Personalized focus strategies based on your patterns',
      icon: '💪',
    },
    {
      title: 'Habit Builder',
      description: 'Create sustainable habits with AI accountability',
      icon: '🌱',
    },
    {
      title: 'Content Creator',
      description: 'Generate planning and productivity content',
      icon: '✍️',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main>
        <section className="py-20 md:py-28 bg-cream-50">
          <div className="container-narrow">
            <h1 className="text-display text-navy-950 mb-6">AI Studio</h1>
            <p className="text-xl text-navy-800 mb-12 max-w-2xl">
              Harness the power of artificial intelligence to manage your ADHD more effectively. Our AI tools understand your brain and help you work with it, not against it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="border border-navy-200 p-8 hover:border-navy-950 hover:bg-navy-50 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-2xl font-bold text-navy-950 mb-3">{tool.title}</h3>
                  <p className="text-navy-700 mb-6">{tool.description}</p>
                  <Link href="#" className="text-navy-950 font-bold hover:opacity-60">
                    Launch Tool →
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="border border-navy-950 p-12 text-center">
              <h2 className="text-3xl font-bold text-navy-950 mb-4">Ready to Transform Your Productivity?</h2>
              <p className="text-navy-700 mb-8 max-w-2xl mx-auto">
                Sign up for free and access all AI Studio features. No credit card required.
              </p>
              <Link href="/signup" className="btn">
                Get Started Free
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
