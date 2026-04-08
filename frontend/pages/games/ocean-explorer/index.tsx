import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  savePlayerData,
  validatePlayerData,
  logStorageDebugInfo,
} from '../../../lib/ocean-explorer-storage'

const buddies = [
  { id: 'fish', name: 'Fish', icon: '🐟', color: 'bg-blue-100 text-blue-500' },
  { id: 'jellyfish', name: 'Jellyfish', icon: '🪼', color: 'bg-pink-100 text-pink-500' },
  { id: 'turtle', name: 'Turtle', icon: '🐢', color: 'bg-green-100 text-green-500' },
  { id: 'shell', name: 'Shell', icon: '🐚', color: 'bg-yellow-100 text-yellow-500' },
  { id: 'anchor', name: 'Anchor', icon: '⚓', color: 'bg-red-100 text-red-500' },
]

export default function OceanExplorerOnboarding() {
  const router = useRouter()

  // Step control
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Step 1 – School info
  const [schoolName, setSchoolName] = useState('')
  const [schoolLocation, setSchoolLocation] = useState('')
  const [contactPerson, setContactPerson] = useState('')

  // Step 2 – Child info
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [selectedBuddy, setSelectedBuddy] = useState<string | null>(null)

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault()
    if (!schoolName) {
      setError('Please enter the school name.')
      return
    }
    setError('')
    setStep(2)
  }

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !age || !gender || !selectedBuddy) {
      setError('Please fill in all fields and choose a sea buddy!')
      return
    }

    setIsSubmitting(true)
    setError('')

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    const ageNum = parseInt(age, 10)

    const payload = {
      player_name: name,
      player_age: ageNum,
      gender,
      sea_buddy: selectedBuddy,
      school_name: schoolName,
      school_location: schoolLocation,
      contact_person: contactPerson,
    }

    const playerData = {
      name,
      age: ageNum,
      gender,
      buddy: selectedBuddy,
      school_name: schoolName,
      school_location: schoolLocation,
      contact_person: contactPerson,
      student_id: '',
      onboarding_session_id: '',
      timestamp: new Date().toISOString(),
    }

    try {
      console.log('Attempting to save onboarding to:', `${apiUrl}/games/ocean-explorer/onboarding`)
      console.log('Payload:', payload)

      const response = await fetch(`${apiUrl}/games/ocean-explorer/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      console.log('Response status:', response.status, response.statusText)
      const responseText = await response.text()
      console.log('Response body:', responseText)

      if (!response.ok) {
        throw new Error(`Server error (${response.status}): ${responseText}`)
      }

      let saved
      try {
        saved = JSON.parse(responseText)
      } catch (parseErr) {
        console.error('Failed to parse response as JSON:', parseErr)
        throw new Error('Invalid response from server')
      }

      // Validate response has required IDs
      if (!saved.student_id) {
        throw new Error('Server response missing student_id')
      }

      console.log('Onboarding saved successfully:', saved)

      // Create complete player data object
      const completePlayerData = {
        name,
        age: ageNum,
        gender,
        buddy: selectedBuddy,
        school_name: schoolName,
        school_location: schoolLocation,
        contact_person: contactPerson,
        student_id: saved.student_id,
        onboarding_session_id: saved.onboarding_session_id || null,
      }

      // Validate data before saving
      const validation = validatePlayerData(completePlayerData)
      if (!validation.valid) {
        console.warn('⚠️ Data validation warnings:', validation.errors)
      }

      // Save using the utility function (handles both sessionStorage and localStorage)
      const saved1 = savePlayerData(completePlayerData)
      if (!saved1) {
        throw new Error('Failed to save data to storage')
      }

      // Log debug info
      logStorageDebugInfo()

      // Wait a brief moment before navigation to ensure data is committed
      setTimeout(() => {
        router.push('/games/ocean-explorer/play')
      }, 500)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.error('Onboarding save failed:', errorMessage)
      console.error('Full error:', err)

      // Provide specific error messages
      let userMessage = errorMessage
      if (errorMessage.includes('Failed to fetch')) {
        userMessage = 'Cannot connect to server. Please check your internet connection.'
      } else if (errorMessage.includes('timeout')) {
        userMessage = 'Request timed out. Please try again.'
      } else if (errorMessage.includes('missing student_id')) {
        userMessage = 'Server error: could not create student record. Please try again.'
      }

      setError(`Save failed: ${userMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <Head>
        <title>Welcome, Ocean Explorer! | Nexora</title>
      </Head>

      <div className="bg-white border-[2px] border-cyan-200 rounded-2xl w-full max-w-lg p-8 shadow-xl shadow-cyan-100/60">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
              Step {step} of 2
            </span>
            <span className="text-xs text-slate-400">
              {step === 1 ? 'School Details' : 'Child Details'}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 border border-red-200 p-3 rounded-lg mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* ── STEP 1: School Info ── */}
        {step === 1 && (
          <form onSubmit={handleStepOne} className="space-y-5">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🏫</div>
              <h1 className="text-2xl font-bold text-blue-800">School Information</h1>
              <p className="text-slate-500 text-sm mt-1">Tell us about the child's school</p>
            </div>

            <div>
              <label
                className="block text-slate-700 font-semibold mb-1.5 text-sm"
                htmlFor="schoolName"
              >
                School Name <span className="text-red-400">*</span>
              </label>
              <input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Greenwood Primary School"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label
                className="block text-slate-700 font-semibold mb-1.5 text-sm"
                htmlFor="schoolLocation"
              >
                City / Location <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="schoolLocation"
                type="text"
                value={schoolLocation}
                onChange={(e) => setSchoolLocation(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label
                className="block text-slate-700 font-semibold mb-1.5 text-sm"
                htmlFor="contactPerson"
              >
                Teacher / Contact Person{' '}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="contactPerson"
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Ms. Sharma"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-100 mt-2"
            >
              Next — Child Details →
            </button>
          </form>
        )}

        {/* ── STEP 2: Child Info ── */}
        {step === 2 && (
          <form onSubmit={handleStart} className="space-y-5">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">👦</div>
              <h1 className="text-2xl font-bold text-blue-800">Child Details</h1>
              <p className="text-slate-500 text-sm mt-1">
                From <span className="text-cyan-600 font-semibold">{schoolName}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-slate-700 font-semibold mb-1.5 text-sm" htmlFor="name">
                  Child's Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter child's name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 text-sm" htmlFor="age">
                  Age <span className="text-red-400">*</span>
                </label>
                <input
                  id="age"
                  type="number"
                  min="3"
                  max="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label
                  className="block text-slate-700 font-semibold mb-1.5 text-sm"
                  htmlFor="gender"
                >
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all bg-white text-sm"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Not Specified">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Sea Buddy */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2 text-sm">
                Choose Sea Buddy <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {buddies.map((buddy) => (
                  <button
                    key={buddy.id}
                    type="button"
                    onClick={() => setSelectedBuddy(buddy.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200 ${
                      selectedBuddy === buddy.id
                        ? 'border-cyan-400 bg-white scale-105 shadow-md shadow-cyan-100'
                        : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-1 ${buddy.color}`}
                    >
                      {buddy.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-600">{buddy.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setError('')
                }}
                className="px-5 py-3 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-100 text-sm"
              >
                {isSubmitting ? 'Saving...' : '🌊 Dive In!'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
