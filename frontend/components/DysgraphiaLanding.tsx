import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { getApiUrl } from '../lib/api-url'

export default function DysgraphiaLanding() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const prompts = [
    'Write your name and draw a star next to it.',
    'Write the numbers 1 to 5 and circle your favorite number.',
    `Write a short sentence: 'I am in space!'`,
  ]

  // Allow explicitly pointing at the ML service root with NEXT_PUBLIC_ML_URL
  // (useful when the ML API is deployed separately from the backend)
  const configuredApi = (process.env.NEXT_PUBLIC_ML_URL as string) || getApiUrl()

  function buildPredictCandidates(apiBase: string) {
    const b = apiBase.replace(/\/$/, '')
    const candidates: string[] = []
    // Prefer the service root + /predict (handles when API_BASE is like http://host:5000 or http://host:5000/api)
    candidates.push(b.replace(/\/api$/i, '') + '/predict')
    // Also try with the api base directly (in case predict is mounted under that base)
    const direct = `${b}/predict`
    if (direct !== candidates[0]) candidates.push(direct)
    return candidates
  }

  const predictCandidates = buildPredictCandidates(configuredApi)
  const [activePredictUrl, setActivePredictUrl] = useState<string | null>(null)
  const [preflightMessage, setPreflightMessage] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const arr = Array.from(e.target.files)
    setFiles(arr)
  }

  async function uploadAndPredict() {
    if (files.length === 0) return
    setLoading(true)
    // ensure we have an active predict URL by checking /model_status on candidate roots
    if (!activePredictUrl) {
      setPreflightMessage('Checking ML endpoints...')
      const rootCandidates = predictCandidates.map((c) => c.replace(/\/predict$/i, ''))
      let found: string | null = null
      for (const root of rootCandidates) {
        try {
          const msRes = await fetch(root.replace(/\/$/, '') + '/model_status')
          if (msRes.ok) {
            const msJson = await msRes.json()
            if (msJson && msJson.model_loaded) {
              found = root.replace(/\/$/, '') + '/predict'
              break
            }
          }
        } catch (e) {
          // ignore and continue
        }
      }
      if (found) {
        setActivePredictUrl(found)
        setPreflightMessage(`Using ML endpoint: ${found}`)
      } else {
        setPreflightMessage('No ML endpoint responded as ready. Will try candidates.')
      }
    }

    const allResults: any[] = []
    for (const f of files) {
      const fd = new FormData()
      fd.append('file', f)
      let success = false
      let lastErr: any = null
      const candidatesToTry = activePredictUrl ? [activePredictUrl, ...predictCandidates] : predictCandidates
      for (const url of candidatesToTry) {
        try {
          const res = await fetch(url, { method: 'POST', body: fd })
          let json: any = null
          try {
            json = await res.json()
          } catch (e) {
            json = { error: `Invalid JSON response (status ${res.status})` }
          }

          if (res.ok) {
            allResults.push({ file: f.name, ok: true, json, url })
            success = true
            break
          } else {
            lastErr = { status: res.status, json, url }
          }
        } catch (err) {
          lastErr = { error: String(err) }
        }
      }

      if (!success) {
        allResults.push({ file: f.name, ok: false, error: lastErr })
      }
    }
    setResults(allResults)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Header />
      <main className="py-16 container-narrow">
        <div className="max-w-3xl mx-auto bg-navy-800 rounded-lg p-8 border border-navy-700">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-md bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-3xl">🚀</div>
            <div>
              <h1 className="text-3xl font-bold">Dysgraphia Assessment</h1>
              <p className="text-navy-200 mt-2">AI-powered handwriting analysis in a galactic setting to detect writing challenges</p>
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-navy-700 rounded-full text-xs">Motor Coordination</span>
                <span className="px-3 py-1 bg-navy-700 rounded-full text-xs">Writing Fluency</span>
                <span className="px-3 py-1 bg-navy-700 rounded-full text-xs">Letter Shape & Stroke</span>
              </div>
            </div>
          </div>

          {step === 0 && (
            <div className="mt-8">
              <div className="bg-navy-900 p-6 rounded-md">
                <h2 className="text-xl font-semibold">Space Writing Adventure</h2>
                <p className="text-navy-300 mt-2">Let's start our journey through time and space!</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className="p-3 rounded bg-navy-800" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                  <input className="p-3 rounded bg-navy-800" placeholder="Age (7-11)" value={age} onChange={e => setAge(e.target.value)} />
                </div>

                <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded" onClick={() => setStep(1)}>
                  Start Adventure!
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Warm-up Exercises</h3>
              <p className="text-navy-300 mt-1">Practice a bit before our big adventure</p>

              <div className="mt-6 bg-navy-900 p-6 rounded">
                <p className="text-center text-navy-100">{prompts[0]}</p>
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-navy-400">Prompt 1 of 3</div>
                  <button className="px-4 py-2 bg-purple-600 rounded" onClick={() => setStep(2)}>Next →</button>
                </div>
              </div>

              <div className="mt-6 bg-navy-900 p-6 rounded">
                <p className="text-center text-navy-100">{prompts[1]}</p>
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-navy-400">Prompt 2 of 3</div>
                  <button className="px-4 py-2 bg-purple-600 rounded" onClick={() => setStep(3)}>Next →</button>
                </div>
              </div>

              <div className="mt-6 bg-navy-900 p-6 rounded">
                <p className="text-center text-navy-100">{prompts[2]}</p>
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-navy-400">Prompt 3 of 3</div>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded" onClick={() => setStep(4)}>Start Game →</button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Writing Eras</h3>
              <p className="text-navy-300">Write down the paragraphs shown. When finished, upload your handwriting for analysis.</p>

              <div className="mt-6 grid gap-4">
                <div className="bg-navy-900 p-6 rounded"> 
                  <h4 className="font-semibold">Ancient Egypt</h4>
                  <p className="text-navy-300 mt-2">Ancient Egyptians built massive pyramids as tombs for their pharaohs. They used simple tools but created amazing structures...</p>
                </div>

                <div className="bg-navy-900 p-6 rounded"> 
                  <h4 className="font-semibold">Medieval Castle</h4>
                  <p className="text-navy-300 mt-2">Medieval knights protected their castles and villages. They trained from childhood to fight with swords and ride horses...</p>
                </div>

                <div className="bg-navy-900 p-6 rounded"> 
                  <h4 className="font-semibold">Final</h4>
                  <p className="text-navy-300 mt-2">Congratulations, you completed the space writing adventure! Upload your handwritten samples for analysis.</p>
                </div>

                <div className="bg-navy-900 p-6 rounded border border-navy-700 flex flex-col gap-5">
                  <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-navy-600 bg-navy-800/60 px-6 py-8 text-center transition-colors hover:border-purple-400 hover:bg-navy-800">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/15 text-2xl text-purple-300">↑</span>
                    <span className="font-medium text-navy-100">Upload handwritten samples</span>
                    <span className="text-sm text-navy-400">PNG, JPG, or JPEG · You can select multiple images</span>
                    <input className="sr-only" type="file" accept="image/*" multiple onChange={handleFileChange} />
                  </label>

                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-full border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-navy-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="max-w-[220px] truncate">{f.name}</span>
                      </div>
                    ))}
                    </div>
                  )}

                  <button className="mt-1 flex items-center justify-center gap-2 rounded bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 font-semibold text-white transition-all hover:from-green-400 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-60" onClick={uploadAndPredict} disabled={loading || files.length === 0}>
                    {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                    {loading ? 'Analyzing samples...' : files.length > 0 ? `Analyze ${files.length} sample${files.length === 1 ? '' : 's'}` : 'Choose samples to analyze'}
                  </button>

                  {preflightMessage && (
                    <div className="flex items-center gap-2 text-sm text-navy-400">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      {preflightMessage}
                    </div>
                  )}

                  {results.length > 0 && (
                    <div className="mt-2 border-t border-navy-700 pt-5">
                      <div className="mb-3 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Analysis complete</p>
                          <h4 className="mt-1 text-lg font-semibold text-white">Your handwriting results</h4>
                        </div>
                        <span className="rounded-full bg-navy-800 px-3 py-1 text-xs text-navy-300">{results.length} sample{results.length === 1 ? '' : 's'}</span>
                      </div>
                      <ul className="grid gap-3">
                        {results.map((r, idx) => (
                          <li key={idx} className={`rounded border p-4 text-sm ${r.ok ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-red-500/25 bg-red-500/5'}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <div className="truncate font-medium text-navy-100">{r.file}</div>
                                <div className={`mt-1 text-xs ${r.ok ? 'text-emerald-300' : 'text-red-300'}`}>{r.ok ? 'Prediction ready' : 'Analysis failed'}</div>
                              </div>
                              {r.ok && <span className="text-lg text-emerald-300">✓</span>}
                            </div>
                            {r.ok ? (
                              <div className="mt-4 grid grid-cols-3 gap-2">
                                <div className="bg-navy-900/70 p-3">
                                  <div className="text-[10px] uppercase tracking-wider text-navy-400">Prediction</div>
                                  <div className="mt-1 capitalize font-semibold text-white">{r.json?.prediction}</div>
                                </div>
                                <div className="bg-navy-900/70 p-3">
                                  <div className="text-[10px] uppercase tracking-wider text-navy-400">Chance</div>
                                  <div className="mt-1 font-semibold text-white">{r.json?.dysgraphia_chance_percent}%</div>
                                </div>
                                <div className="bg-navy-900/70 p-3">
                                  <div className="text-[10px] uppercase tracking-wider text-navy-400">Risk</div>
                                  <div className="mt-1 font-semibold text-white">{r.json?.risk_level}</div>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-3 text-red-300">
                                <div>Error: {typeof r.error === 'string' ? r.error : JSON.stringify(r.error || r.json)}</div>
                                {r.url && <div className="mt-1 text-xs text-navy-400">Tried: {r.url}</div>}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button className="px-4 py-2 bg-navy-700 rounded" onClick={() => setStep(Math.max(0, step - 1))}>Back</button>
            {step < 4 && (<button className="px-4 py-2 bg-navy-700 rounded" onClick={() => setStep(step + 1)}>Skip →</button>)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
