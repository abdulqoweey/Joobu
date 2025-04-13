'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Briefcase, MapPin, Building, CalendarDays } from 'lucide-react'
import { JobSearchForm } from './search-form'

type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  category: string
  level: string
  description: string
  postedAt: string
  countryFlag: string | null
}

type Filter = {
  type: string[]
  category: string[]
  level: string[]
}

export function JobListing({ joblisting = [] }: { joblisting: Job[] }) {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(joblisting)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  const [filters, setFilters] = useState<Filter>({
    type: [],
    category: [],
    level: [],
  })
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const jobsPerPage = 10

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  useEffect(() => {
    let filtered = joblisting

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      )
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((job) =>
        filters.type.some(
          (filter) => filter.toLowerCase() === job.type.toLowerCase()
        )
      )
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter((job) =>
        filters.category.some(
          (filter) => filter.toLowerCase() === job.category.toLowerCase()
        )
      )
    }

    if (filters.level.length > 0) {
      filtered = filtered.filter((job) =>
        filters.level.some(
          (filter) => filter.toLowerCase() === job.level.toLowerCase()
        )
      )
    }

    setFilteredJobs(filtered)
    setCurrentPage(1)
    setVisibleJobs(filtered.slice(0, jobsPerPage))
  }, [debouncedSearchQuery, filters, joblisting])

  const loadMoreJobs = () => {
    const startIndex = currentPage * jobsPerPage
    const nextJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage)
    if (nextJobs.length === 0) return
    setVisibleJobs((prev) => [...prev, ...nextJobs])
    setCurrentPage((prev) => prev + 1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className='md:p-4'>
      <div className='sticky top-0 z-40 w-full md:p-0 bg-white'>
        <JobSearchForm onSearch={handleSearch} />
      </div>

      {visibleJobs.length > 0 ? (
        <ul className='space-y-4'>
          {visibleJobs.map((job) => (
            <li key={`job-${job.id}`} className='p-4 border-b'>
              <h2 className='text-lg font-semibold flex items-center gap-2'>
                <Briefcase size={18} /> {job.title}
              </h2>

              <p className='text-sm text-gray-600 flex items-center gap-2 mt-1'>
                <Building size={16} /> {job.company}
              </p>

              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <MapPin size={16} /> {job.location}
              </p>

              <p className='text-sm text-gray-500'>
                {job.type} | {job.level}
              </p>

              <p className='mt-2 text-gray-700'>{job.description}</p>

              <p className='text-xs text-gray-400 mt-2 flex items-center gap-2'>
                <CalendarDays size={14} /> Posted on {job.postedAt}
              </p>

              <div className='mt-4 flex flex-col sm:flex-row gap-3'>
                {/* Apply Now Link with job id */}
                <Link href={`/apply/${job.id}`} passHref>
                  <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'>
                    Apply Now
                  </button>
                </Link>

                <Link href={`/job-details/${job.id}`} passHref>
                  <button className='px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition'>
                    View Details
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center py-8 text-gray-500'>No Jobs Available</p>
      )}

      {filteredJobs.length > visibleJobs.length && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={loadMoreJobs}
            className='px-4 py-2 font-bold text-gray-500 hover:text-gray-700 transition'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
