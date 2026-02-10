import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Up to 50 tasks',
        'Basic focus sessions',
        'Task history',
        'Email support',
      ],
      cta: 'Get Started',
      link: '/signup',
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For serious productivity',
      features: [
        'Unlimited tasks',
        'Advanced AI insights',
        'Custom focus sessions',
        'Habit tracking',
        'Priority support',
        'Export data',
      ],
      cta: 'Start Free Trial',
      link: '/signup',
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$24.99',
      period: '/month',
      description: 'For team collaboration',
      features: [
        'Everything in Pro',
        'Team workspaces',
        'Task delegation',
        'Team analytics',
        'Admin controls',
        'SSO integration',
      ],
      cta: 'Contact Sales',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-28 bg-cream-50">
          <div className="container-narrow">
            <h1 className="text-display text-navy-950 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-navy-700 mb-16 max-w-2xl">
              Choose the plan that works for you. Always fair, no hidden fees.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`border p-8 ${
                    plan.highlighted
                      ? 'border-navy-950 bg-navy-950 text-cream-50'
                      : 'border-navy-200 bg-cream-50 text-navy-950'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-cream-300' : 'text-navy-700'}`}>
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    {plan.period && <div className="text-sm">{plan.period}</div>}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span className="mr-3">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.link} className={`block w-full text-center ${plan.highlighted ? 'btn text-navy-950 bg-cream-50' : 'btn'}`}>
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
