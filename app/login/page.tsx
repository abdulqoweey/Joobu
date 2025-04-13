'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

const LoginPage: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setError(null)
    setEmailError(null)
    setPasswordError(null)

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    // Ensure password is not empty
    if (password.trim() === '') {
      setPasswordError('Password cannot be empty.')
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.status === 200) {
        // Redirect to the homepage if login is successful
        router.push(data.redirect || '/')
      } else {
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h1 className='text-2xl font-semibold text-center text-green-700 mb-6'>
          Log In to Your Account
        </h1>

        {error && (
          <div className='text-red-500 text-sm text-center mb-4'>{error}</div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Field */}
          <div className='flex items-center border border-gray-300 rounded-lg'>
            <Mail className='w-5 h-5 text-gray-600 mx-2' />
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              className='w-full px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>
          {emailError && (
            <div className='text-red-500 text-sm'>{emailError}</div>
          )}

          {/* Password Field */}
          <div className='flex items-center border border-gray-300 rounded-lg'>
            <Lock className='w-5 h-5 text-gray-600 mx-2' />
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='w-full px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='text-gray-600 ml-2 cursor-pointer'
            >
              {showPassword ? (
                <EyeOff className='w-6 h-6' />
              ) : (
                <Eye className='w-6 h-6' />
              )}
            </button>
          </div>
          {passwordError && (
            <div className='text-red-500 text-sm'>{passwordError}</div>
          )}

          <button
            type='submit'
            className='w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300'
          >
            Log In
          </button>
        </form>

        <div className='text-center mt-4'>
          <span className='text-sm text-gray-600'>
            Don't have an account?{' '}
            <a href='/signup' className='text-green-600 hover:text-green-700'>
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
