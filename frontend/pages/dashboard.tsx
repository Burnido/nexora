import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main className="container-narrow py-20">
        <div className="max-w-3xl">
          <h1 className="text-display text-navy-950 mb-4">Dashboard</h1>
          <p className="text-lg text-navy-700 mb-12">
            Your personalized ADHD management dashboard. Coming soon.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-navy-200 p-8">
              <h2 className="text-2xl font-bold text-navy-950 mb-4">📋 Today's Tasks</h2>
              <p className="text-navy-700 mb-6">Manage and track your daily tasks</p>
              <button className="btn">Start Planning</button>
            </div>

            <div className="border border-navy-200 p-8">
              <h2 className="text-2xl font-bold text-navy-950 mb-4">⏱️ Focus Session</h2>
              <p className="text-navy-700 mb-6">Begin a focused work session</p>
              <button className="btn">Start Focus</button>
            </div>

            <div className="border border-navy-200 p-8">
              <h2 className="text-2xl font-bold text-navy-950 mb-4">📊 Progress</h2>
              <p className="text-navy-700 mb-6">View your productivity insights</p>
              <button className="btn">View Stats</button>
            </div>

            <div className="border border-navy-200 p-8">
              <h2 className="text-2xl font-bold text-navy-950 mb-4">🧠 AI Insights</h2>
              <p className="text-navy-700 mb-6">Get personalized recommendations</p>
              <button className="btn">Get Insights</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
