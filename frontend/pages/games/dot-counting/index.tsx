import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

type Round = {
  count: number
  options: number[]
}

const rounds: Round[] = [
  { count: 5, options: [4, 5, 6] },
  { count: 7, options: [6, 7, 8] },
  { count: 3, options: [2, 3, 4] },
  { count: 8, options: [7, 8, 9] },
]

export default function DotCountingGame() {
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState('')

  const round = rounds[currentRound]

  const dots = useMemo(
    () =>
      Array.from({ length: round.count }, (_, index) => ({
        id: index,
        left: `${12 + (index % 5) * 16}%`,
        top: `${20 + Math.floor(index / 5) * 36}%`,
      })),
    [round.count]
  )

  const handleAnswer = (answer: number) => {
    if (finished || selectedAnswer !== null) {
      return
    }

    setSelectedAnswer(answer)

    if (answer === round.count) {
      setScore((current) => current + 1)
      setFeedback('Correct!')
    } else {
      setFeedback(`Not quite. It was ${round.count}.`)
    }
  }

  const handleNext = () => {
    const nextRound = currentRound + 1

    if (nextRound >= rounds.length) {
      setFinished(true)
      return
    }

    setCurrentRound(nextRound)
    setSelectedAnswer(null)
    setFeedback('')
  }

  const restartGame = () => {
    setCurrentRound(0)
    setSelectedAnswer(null)
    setScore(0)
    setFinished(false)
    setFeedback('')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffd7f0_0%,_#d9d2ff_45%,_#fdfbf7_100%)]">
      <Head>
        <title>Dot Counting Game | Nexora</title>
      </Head>
      <Header />
      <main className="container-narrow py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-navy-600 mb-2">Game</p>
              <h1 className="text-display text-navy-950">Dot Counting Challenge</h1>
            </div>
            <Link href="/games" className="btn btn-outline whitespace-nowrap">
              Back to Games
            </Link>
          </div>

          {!finished ? (
            <div className="bg-white/90 border border-navy-200 shadow-[0_16px_40px_rgba(26,30,38,0.08)] p-6 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-navy-500 mb-1">
                    Round {currentRound + 1} of {rounds.length}
                  </p>
                  <p className="text-lg font-semibold text-navy-950">Score: {score}</p>
                </div>
                <div className="w-40 md:w-64 h-2 bg-navy-100">
                  <div
                    className="h-full bg-fuchsia-500 transition-all"
                    style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">
                  How many dots do you see?
                </h2>
                <p className="text-navy-700">Count carefully and tap the correct number.</p>
              </div>

              <div className="relative mx-auto w-full max-w-2xl min-h-[280px] border-2 border-navy-200 bg-gradient-to-br from-white to-cream-50 overflow-hidden p-6 md:p-10 mb-8">
                {dots.map((dot) => (
                  <span
                    key={dot.id}
                    className="absolute block w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 shadow-[0_8px_20px_rgba(236,72,153,0.25)]"
                    style={{ left: dot.left, top: dot.top }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                {round.options.map((option) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === round.count

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(option)}
                      className={`py-4 md:py-5 text-2xl md:text-3xl font-bold border transition-colors ${
                        selectedAnswer === null
                          ? 'bg-navy-950 text-white border-navy-950 hover:bg-navy-800'
                          : isSelected && isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : isSelected
                              ? 'bg-rose-500 text-white border-rose-500'
                              : 'bg-navy-100 text-navy-400 border-navy-100'
                      }`}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-lg font-medium text-navy-800 min-h-[1.5rem]">{feedback}</p>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentRound === rounds.length - 1 ? 'Finish Game' : 'Next Round'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/90 border border-navy-200 shadow-[0_16px_40px_rgba(26,30,38,0.08)] p-8 md:p-12 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-navy-500 mb-4">Completed</p>
              <h2 className="text-heading text-navy-950 mb-4">Nice work</h2>
              <p className="text-lg text-navy-700 mb-8">
                You scored {score} out of {rounds.length}.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button type="button" onClick={restartGame} className="btn">
                  Play Again
                </button>
                <Link href="/games" className="btn btn-outline">
                  Back to Games
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
