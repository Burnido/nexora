import React, { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
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
            <h1 className="text-heading text-navy-950 mb-2">Create Account</h1>
            <p className="text-navy-700">Join thousands managing their ADHD better.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy-950 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-navy-200 text-navy-950 placeholder-navy-400 focus:outline-none focus:border-navy-950 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-950 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-navy-200 text-navy-950 placeholder-navy-400 focus:outline-none focus:border-navy-950 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy-950 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-navy-200 text-navy-950 placeholder-navy-400 focus:outline-none focus:border-navy-950 transition-colors"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 accent-navy-950"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-navy-700">
                I agree to the{' '}
                <Link href="/terms" className="font-bold hover:opacity-60">
                  Terms of Service
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn text-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-navy-200"></div>
            <div className="px-4 text-sm text-navy-500">or</div>
            <div className="flex-grow border-t border-navy-200"></div>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3">
            <button className="w-full btn btn-outline text-center">
              Sign up with Google
            </button>
            <button className="w-full btn btn-outline text-center">
              Sign up with GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-navy-700 text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="font-bold text-navy-950 hover:opacity-60 transition-opacity">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
