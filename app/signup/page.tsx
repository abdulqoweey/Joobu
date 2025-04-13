'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'

const SignUpPage: FC = () => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return passwordRegex.test(password)
  }

  const validateFullName = (fullName: string) => {
    const nameRegex = /^[A-Za-z\s]+$/
    return nameRegex.test(fullName)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous error messages
    setError(null)

    // Validate full name
    if (!validateFullName(fullName)) {
      setError('Full name must only contain letters and spaces.')
      return
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, contain at least one number, and one special character.'
      )
      return
    }

    // Validate if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // Ensure terms and conditions are accepted
    if (!termsAccepted) {
      setError('You must accept the terms and conditions.')
      return
    }

    try {
      // Add your sign-up logic here, e.g., creating a new user in the database

      // After successful sign-up, redirect to the login page
      router.push('/login')
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h1 className='text-2xl font-semibold text-center text-green-700 mb-6'>
          Create an Account
        </h1>

        {error && (
          <div className='text-red-500 text-sm text-center mb-4'>{error}</div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Full Name Field */}
          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-600'
            >
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-600'
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-600'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <small className='text-gray-600'>
              Password must be at least 8 characters long, contain at least one
              number, and one special character.
            </small>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-600'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='terms'
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className='mr-2'
            />
            <label htmlFor='terms' className='text-sm text-gray-600'>
              I accept the{' '}
              <a href='/terms' className='text-green-600 hover:text-green-700'>
                terms and conditions
              </a>
            </label>
          </div>

          <button
            type='submit'
            className='w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300'
          >
            Sign Up
          </button>
        </form>

        <div className='text-center mt-4'>
          <span className='text-sm text-gray-600'>
            Already have an account?{' '}
            <a href='/login' className='text-green-600 hover:text-green-700'>
              Log in
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
