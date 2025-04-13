'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Job {
  title: string
  company: string
}

interface FormData {
  name: string
  email: string
  phone: string
  coverLetter: string
  resume: File | null
  address: string
  linkedin: string
  portfolio: string
}

export default function ApplyForm() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null,
    address: '',
    linkedin: '',
    portfolio: '',
  })
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`/api/jobs/${id}`)
          if (!response.ok) {
            throw new Error('Job data not found')
          }
          const jobData: Job = await response.json()
          setJob(jobData)
        } catch (error) {
          console.error('Error fetching job details:', error)
        }
      }
      fetchJobDetails()
    }
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Validate LinkedIn URL: it should not start with 'http://' or 'https://'
    if (
      formData.linkedin.startsWith('http://') ||
      formData.linkedin.startsWith('https://')
    ) {
      alert(
        'LinkedIn URL should not start with "http://" or "https://". Please remove these prefixes.'
      )
      setSubmitting(false)
      return
    }

    // LinkedIn URL validation regex (match linkedin.com/in/username format)
    const linkedinPattern = /^(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/i

    if (!linkedinPattern.test(formData.linkedin)) {
      alert(
        'Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/username).'
      )
      setSubmitting(false)
      return
    }

    // Add the protocol if missing
    const linkedinUrl = `https://${formData.linkedin}`

    const form = new FormData()
    form.append('name', formData.name)
    form.append('email', formData.email)
    form.append('phone', formData.phone)
    form.append('coverLetter', formData.coverLetter)
    form.append('address', formData.address)
    form.append('linkedin', linkedinUrl) // Use the corrected LinkedIn URL
    form.append('portfolio', formData.portfolio)

    if (formData.resume) {
      form.append('resume', formData.resume)
    }

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: form,
      })

      if (!response.ok) {
        throw new Error('Failed to submit the application')
      }

      const data = await response.json()
      alert(data.message)
      router.push('/')
    } catch (error) {
      console.error('Error submitting the form:', error)
      alert(
        'There was an error submitting your application. Please try again later.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (!job) return <p className='p-4'>Loading job details...</p>

  return (
    <div className='p-16 mt-10 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-semibold mb-2'>{`Apply for ${job.title}`}</h1>
      <p className='text-sm text-gray-500 mb-4'>{job.company}</p>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>Full Name</label>
          <input
            type='text'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>
            Email Address
          </label>
          <input
            type='email'
            name='email'
            required
            value={formData.email}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>Phone Number</label>
          <input
            type='tel'
            name='phone'
            required
            value={formData.phone}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>Cover Letter</label>
          <textarea
            name='coverLetter'
            value={formData.coverLetter}
            onChange={handleChange}
            rows={4}
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          ></textarea>
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>Address</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>
            LinkedIn Profile
          </label>
          <input
            type='text'
            name='linkedin'
            value={formData.linkedin}
            onChange={handleChange}
            placeholder='linkedin.com/in/username'
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>
            Portfolio URL (Optional)
          </label>
          <input
            type='url'
            name='portfolio'
            value={formData.portfolio}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='col-span-1'>
          <label className='block text-sm font-medium mb-1'>
            Upload Resume (PDF only)
          </label>
          <input
            type='file'
            accept='.pdf'
            required
            onChange={handleFileChange}
            className='w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        {/* <button
          type='submit'
          disabled={submitting}
          className='col-span-1 md:col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition'
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button> */}

        <button
          type='submit'
          disabled={true}
          className='col-span-1 md:col-span-2 bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed'
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}
