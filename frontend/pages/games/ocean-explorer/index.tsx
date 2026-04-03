import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const buddies = [
  { id: 'fish', name: 'Fish', icon: '🐟', color: 'bg-blue-100 text-blue-500' },
  { id: 'jellyfish', name: 'Jellyfish', icon: '🪼', color: 'bg-pink-100 text-pink-500' },
  { id: 'turtle', name: 'Turtle', icon: '🐢', color: 'bg-green-100 text-green-500' },
  { id: 'shell', name: 'Shell', icon: '🐚', color: 'bg-yellow-100 text-yellow-500' },
  { id: 'anchor', name: 'Anchor', icon: '⚓', color: 'bg-red-100 text-red-500' },
]

export default function OceanExplorerOnboarding() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [selectedBuddy, setSelectedBuddy] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !age || !gender || !selectedBuddy) {
      setError('Please fill in all fields and choose a buddy!')
      return
    }

    // Save session config broadly for the game
    sessionStorage.setItem(
      'ocean_explorer_player',
      JSON.stringify({ name, age: parseInt(age, 10), gender, buddy: selectedBuddy })
    )
    router.push('/games/ocean-explorer/play')
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <Head>
        <title>Welcome, Ocean Explorer! | Nexora</title>
      </Head>

      <div className="bg-sky-50/80 border-[3px] border-cyan-400 rounded-2xl w-full max-w-md p-8 shadow-xl shadow-cyan-200/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Welcome, Ocean Explorer!</h1>
          <p className="text-slate-500">Tell us about yourself before diving in</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleStart} className="space-y-6">
          <div>
            <label className="block text-slate-800 font-semibold mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-semibold mb-2" htmlFor="age">
              Your Age
            </label>
            <input
              id="age"
              type="number"
              min="3"
              max="99"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="How old are you?"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-semibold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all bg-white"
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Not Specified">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-800 font-semibold mb-3">
              Choose Your Sea Buddy
            </label>
            <div className="grid grid-cols-3 gap-4">
              {buddies.map((buddy) => (
                <button
                  key={buddy.id}
                  type="button"
                  onClick={() => setSelectedBuddy(buddy.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedBuddy === buddy.id
                      ? 'border-cyan-400 bg-white scale-105 shadow-md shadow-cyan-100'
                      : 'border-transparent hover:bg-white/50'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 ${buddy.color}`}
                  >
                    {buddy.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{buddy.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-200/50 mt-6 text-lg"
          >
            Dive In!
          </button>
        </form>
      </div>
    </div>
  )
}
