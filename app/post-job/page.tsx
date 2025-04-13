'use client'

import React, { useState, useEffect } from 'react'
import { useDropzone, Accept } from 'react-dropzone'
import { Upload } from 'lucide-react' // Import the Upload icon from Lucide

// JobData type definition based on the structure
type JobData = {
  title: string
  company: string
  location: string
  type: string
  category: string
  level: string
  description: string
  logo: string | null
  postedAt?: string
  countryFlag?: string | null
}

const PostJobPage = () => {
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    category: 'design',
    level: 'entry',
    description: '',
    logo: null,
  })

  const [isValid, setIsValid] = useState(true)
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  // Handle input change for different input types
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Define accept types as an Accept object
  const acceptTypes: Accept = {
    'image/jpeg': [],
    'image/png': [],
    'image/gif': [],
  }

  // Handle drag-and-drop file upload using react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptTypes, // Use the defined Accept type for file types
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      const fileURL = URL.createObjectURL(file)
      setJobData((prevData) => ({
        ...prevData,
        logo: fileURL,
      }))
    },
  })

  const validateForm = (): boolean => {
    const newErrorMessages: string[] = []

    // Validate Job Title
    if (!jobData.title.trim()) newErrorMessages.push('Job Title is required.')
    else if (jobData.title.length < 3)
      newErrorMessages.push('Job Title should be at least 3 characters.')

    // Validate Company Name
    if (!jobData.company.trim())
      newErrorMessages.push('Company Name is required.')
    else if (!/^[a-zA-Z\s]+$/.test(jobData.company))
      newErrorMessages.push('Company Name should only contain letters.')

    // Validate Location
    if (!jobData.location.trim()) newErrorMessages.push('Location is required.')
    else if (!/^[a-zA-Z\s,]+$/.test(jobData.location))
      newErrorMessages.push(
        'Location should only contain letters, spaces, and commas.'
      )

    // Validate Description
    if (!jobData.description.trim())
      newErrorMessages.push('Job Description is required.')
    else if (jobData.description.length < 20)
      newErrorMessages.push(
        'Job Description should be at least 20 characters long.'
      )
    else if (jobData.description.length > 500)
      newErrorMessages.push('Job Description should not exceed 500 characters.')

    // Logo validation (optional)
    if (!jobData.logo) newErrorMessages.push('Company Logo is required.')

    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages)
      return false
    }

    setErrorMessages([]) // Clear error messages if form is valid
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form fields before submitting
    const isFormValid = validateForm()
    if (!isFormValid) {
      setIsValid(false)
      return
    }

    setIsValid(true)
    // Here you can handle the submission (e.g., send the data to the backend)
    console.log('Job posted:', jobData)
    alert('Job posted successfully!')
  }

  useEffect(() => {
    // You can set default job data if needed based on JobDataList
    setJobData({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      category: 'design',
      level: 'entry',
      description: '',
      logo: null,
    })
  }, [])

  return (
    <div className='pt-20 px-4 md:px-16 lg:px-20 xl:px-32'>
      <h1 className='text-2xl font-bold mb-6'>Post a New Job</h1>

      {/* Error Message Display */}
      {!isValid && (
        <ul className='text-red-600 mb-6'>
          {errorMessages.map((msg, index) => (
            <li key={index}>- {msg}</li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {/* Left Column */}
        <div className='space-y-6'>
          {/* Company Logo Upload */}
          <div>
            <label
              htmlFor='logo'
              className='block text-sm font-medium text-gray-700'
            >
              Company Logo
            </label>
            <div
              {...getRootProps()}
              className='w-full h-52 mt-2 p-3 border place-items-center border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-center items-center'
            >
              <input
                {...getInputProps()}
                id='logo'
                name='logo'
                className='flex place-items-center items-center'
              />
              <div className='text-center text-gray-500'>
                <Upload size={32} className='mx-auto mb-2' />{' '}
                {/* Lucide Upload Icon */}
                <p>Drag & drop the logo here, or click to select</p>
              </div>
            </div>
            {jobData.logo && (
              <div className='mt-4'>
                <img
                  src={jobData.logo}
                  alt='Logo Preview'
                  className='w-24 h-24 object-cover rounded-md'
                />
              </div>
            )}
          </div>

          {/* Job Title */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Job Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={jobData.title}
              onChange={handleChange}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter the job title'
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor='company'
              className='block text-sm font-medium text-gray-700'
            >
              Company Name
            </label>
            <input
              type='text'
              id='company'
              name='company'
              value={jobData.company}
              onChange={handleChange}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter company name'
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor='location'
              className='block text-sm font-medium text-gray-700'
            >
              Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              value={jobData.location}
              onChange={handleChange}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter job location'
            />
          </div>
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          {/* Job Type */}
          <div>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-gray-700'
            >
              Job Type
            </label>
            <select
              id='type'
              name='type'
              value={jobData.type}
              onChange={handleChange}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value='full-time'>Full-time</option>
              <option value='part-time'>Part-time</option>
              <option value='contract'>Contract</option>
              <option value='internship'>Internship</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700'
            >
              Category
            </label>
            <select
              id='category'
              name='category'
              value={jobData.category}
              onChange={handleChange}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value='design'>Design</option>
              <option value='development'>Development</option>
              <option value='marketing'>Marketing</option>
              <option value='sales'>Sales</option>
              <option value='hr'>Human Resources</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label
              htmlFor='level'
              className='block text-sm font-medium text-gray-700'
            >
              Experience Level
            </label>
            <select
              id='level'
              name='level'
              value={jobData.level}
              onChange={handleChange}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value='entry'>Entry-level</option>
              <option value='mid'>Mid-level</option>
              <option value='senior'>Senior-level</option>
            </select>
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Job Description
            </label>
            <textarea
              id='description'
              name='description'
              value={jobData.description}
              onChange={handleChange}
              rows={6}
              className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Provide a detailed description of the job'
            />
          </div>

          {/* Submit Button */}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors'
            >
              Post Job
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostJobPage
