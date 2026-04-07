import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const MAX_ROUNDS = 10
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function getRandomLetters(target: string, count: number) {
  const letters = [target]
  while (letters.length < count) {
    const randomChar = LETTERS[Math.floor(Math.random() * LETTERS.length)]
    if (!letters.includes(randomChar)) {
      letters.push(randomChar)
    }
  }
  return letters.sort(() => Math.random() - 0.5)
}

export default function BubbleBayPlay() {
  const router = useRouter()

  const [playerData, setPlayerData] = useState<any>(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [score, setScore] = useState(0)
  const [targetLetter, setTargetLetter] = useState('')
  const [options, setOptions] = useState<string[]>([])

  const [showFeedback, setShowFeedback] = useState<'Correct' | 'Wrong' | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [finalScore, setFinalScore] = useState<number | null>(null)

  // Initialize game / load player info
  useEffect(() => {
    const rawData = sessionStorage.getItem('ocean_explorer_player')
    if (rawData) {
      setPlayerData(JSON.parse(rawData))
    } else {
      // If no data, redirect to onboarding
      router.replace('/games/ocean-explorer')
    }
    setupRound()
  }, [])

  const setupRound = () => {
    const randTarget = LETTERS[Math.floor(Math.random() * LETTERS.length)]
    setTargetLetter(randTarget)
    setOptions(getRandomLetters(randTarget, 4))
    setShowFeedback(null)
    playHintAudio(randTarget)
  }

  const playHintAudio = (letter: string) => {
    if ('speechSynthesis' in window) {
      const char = letter || targetLetter
      const utterance = new SpeechSynthesisUtterance(`Find the letter ${char}`)
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleBubbleClick = (letter: string) => {
    if (showFeedback || gameOver) return

    if (letter === targetLetter) {
      setShowFeedback('Correct')
      setScore((s) => s + 1)
      nextRound(true)
    } else {
      setShowFeedback('Wrong')
      nextRound(false)
    }
  }

  const nextRound = (answeredCorrect: boolean) => {
    const roundScoreAfterAnswer = score + (answeredCorrect ? 1 : 0)

    setTimeout(() => {
      if (currentRound < MAX_ROUNDS) {
        setCurrentRound((r) => r + 1)
        setupRound()
      } else {
        setFinalScore(roundScoreAfterAnswer)
        setGameOver(true)
        saveScore(roundScoreAfterAnswer)
      }
    }, 1500)
  }

  const saveScore = async (scoreToSave: number) => {
    if (!playerData || isSaving) return
    setIsSaving(true)
    setSaveError('')

    // Get backend URL fallback to localhost for local testing
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

    try {
      const response = await fetch(`${apiUrl}/games/ocean-explorer/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: playerData.student_id,
          onboarding_session_id: playerData.onboarding_session_id,
          player_name: playerData.name,
          player_age: playerData.age,
          gender: playerData.gender,
          sea_buddy: playerData.buddy,
          score: scoreToSave,
          school_name: playerData.school_name,
          school_location: playerData.school_location,
          contact_person: playerData.contact_person,
        }),
      })

      if (!response.ok) {
        throw new Error('Server rejected score save request')
      }

      setIsSaved(true)
    } catch (e) {
      console.error('Save failed', e)
      setIsSaved(false)
      setSaveError('Could not save game data. Please retry.')
    } finally {
      setIsSaving(false)
    }
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Assessment Complete!</h1>
          <p className="text-2xl mb-6">
            You scored {finalScore ?? score} / {MAX_ROUNDS}
          </p>
          <div className="text-6xl mb-8">
            {playerData?.buddy === 'fish' ? '🐟' : playerData?.buddy === 'turtle' ? '🐢' : '⚓'}
          </div>
          {isSaving ? (
            <p className="text-slate-500 animate-pulse">Saving your session...</p>
          ) : saveError ? (
            <div className="space-y-3">
              <p className="text-red-500 text-sm">{saveError}</p>
              <button
                onClick={() => saveScore(finalScore ?? score)}
                className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 w-full"
              >
                Retry Save
              </button>
            </div>
          ) : isSaved ? (
            <button
              onClick={() => router.push('/games/ocean-explorer')}
              className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 w-full"
            >
              Play Again
            </button>
          ) : (
            <p className="text-slate-500">Finalizing save...</p>
          )}
        </div>
      </div>
    )
  }

  const progressPercentage = (currentRound / MAX_ROUNDS) * 100

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col p-4 md:p-8">
      <Head>
        <title>Bubble Bay | Ocean Explorer</title>
      </Head>

      {/* Header */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Bubble Bay</h1>
          <div className="h-2 w-16 bg-cyan-400 mt-2 rounded-full"></div>
        </div>
        <div className="bg-blue-100 text-blue-600 font-bold px-4 py-1.5 rounded-full text-sm">
          Round {currentRound} of {MAX_ROUNDS}
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mb-8">
        <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full flex-grow flex flex-col items-center">
        <div className="text-center mb-6">
          <p className="text-slate-700 text-lg mb-4">
            Burst the bubble with the letter by taping on it:
          </p>
          <button
            onClick={() => playHintAudio(targetLetter)}
            className="w-12 h-12 rounded-full border-2 border-blue-400 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors mx-auto"
            aria-label="Play hint"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>

        {/* Game Area */}
        <div className="relative w-full h-96 bg-gradient-to-br from-cyan-100/50 to-blue-200/50 rounded-2xl border border-white/50 shadow-inner overflow-hidden flex flex-wrap items-center justify-center gap-8 p-8 backdrop-blur-sm">
          {/* Bubbles */}
          {options.map((letter, i) => (
            <button
              key={`${currentRound}-${i}`}
              onClick={() => handleBubbleClick(letter)}
              className="relative group animate-bounce"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }}
            >
              <div className="w-24 h-24 rounded-full bg-blue-400/30 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                <span className="text-4xl font-extrabold text-blue-600 opacity-80">{letter}</span>
                <div className="absolute top-2 right-4 w-4 h-4 bg-white/40 rounded-full"></div>
              </div>
            </button>
          ))}

          {/* Feedback Overlay */}
          {showFeedback && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-white/20 backdrop-blur-sm">
              <div className="bg-white px-8 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 animate-slideUp">
                {showFeedback === 'Correct' ? (
                  <>
                    <span className="text-blue-600 text-2xl">Correct!</span>
                    <span className="text-3xl">🎉</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500 text-2xl">Try Again!</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
