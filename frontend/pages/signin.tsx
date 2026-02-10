import React, { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Connect to backend
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh_-_120px)]">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-heading text-navy-950 mb-2">Sign In</h1>
            <p className="text-navy-700">Welcome back. Let's get focused.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-950 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-navy-200 text-navy-950 placeholder-navy-400 focus:outline-none focus:border-navy-950 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy-950 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-navy-200 text-navy-950 placeholder-navy-400 focus:outline-none focus:border-navy-950 transition-colors"
              />
            </div>

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-navy-700 hover:text-navy-950 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn text-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-navy-200"></div>
            <div className="px-4 text-sm text-navy-500">or</div>
            <div className="flex-grow border-t border-navy-200"></div>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <button className="w-full btn btn-outline text-center">
              Continue with Google
            </button>
            <button className="w-full btn btn-outline text-center">
              Continue with GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-navy-700 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-navy-950 hover:opacity-60 transition-opacity">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
