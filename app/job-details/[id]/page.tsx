import { FC } from 'react'
import { notFound } from 'next/navigation'
import { JobData } from '@/app/components/job-data'

import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  BarChart2,
  Calendar,
  Share2,
  Send,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

interface JobDetailsPageProps {
  params: {
    id: string
  }
}

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

const formatJobType = (type: string) => {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatCategory = (category: string) => {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatLevel = (level: string) => {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

const getRelatedJobs = (currentJob: Job, allJobs: Job[], limit = 3) => {
  // Exclude the current job
  const otherJobs = allJobs.filter((job) => job.title !== currentJob.title)

  // Prioritize jobs with same category, then type, then level
  return otherJobs
    .sort((a, b) => {
      let scoreA = 0
      let scoreB = 0

      if (a.category === currentJob.category) scoreA += 3
      if (b.category === currentJob.category) scoreB += 3

      if (a.type === currentJob.type) scoreA += 2
      if (b.type === currentJob.type) scoreB += 2

      if (a.level === currentJob.level) scoreA += 1
      if (b.level === currentJob.level) scoreB += 1

      return scoreB - scoreA
    })
    .slice(0, limit)
}

const JobDetailsPage: FC<JobDetailsPageProps> = async ({ params }) => {
  const { id } = await params // Awaiting the params here
  const jobId = Number(id)

  if (isNaN(jobId) || jobId < 0 || jobId >= JobData.length) {
    return notFound()
  }

  // Find the job by id, not by index
  const job = JobData.find((job) => job.id === jobId)

  if (!job) {
    return notFound()
  }

  const relatedJobs = getRelatedJobs(job, JobData)

  return (
    <div className='pt-24 p-6 max-w-6xl mx-auto'>
      <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
        <h1 className='text-3xl font-bold text-green-700 capitalize'>
          {job.title}
        </h1>

        <div className='mt-4 space-y-3'>
          <div className='flex items-center text-gray-600'>
            <Building2 className='w-5 h-5 mr-2' />
            <span className='capitalize'>{job.company}</span>
          </div>

          <div className='flex items-center text-gray-600'>
            <MapPin className='w-5 h-5 mr-2' />
            <span className='capitalize'>{job.location}</span>
            {job.countryFlag && <span className='ml-2 text-sm'>🇺🇸</span>}
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
            <div className='flex items-center text-sm text-gray-500'>
              <Clock className='w-4 h-4 mr-1.5' />
              <span>{formatJobType(job.type)}</span>
            </div>

            <div className='flex items-center text-sm text-gray-500'>
              <Briefcase className='w-4 h-4 mr-1.5' />
              <span>{formatCategory(job.category)}</span>
            </div>

            <div className='flex items-center text-sm text-gray-500'>
              <BarChart2 className='w-4 h-4 mr-1.5' />
              <span>{formatLevel(job.level)}</span>
            </div>
          </div>

          <div className='flex items-center text-sm text-gray-400 mt-2'>
            <Calendar className='w-4 h-4 mr-1.5' />
            <span>
              Posted on{' '}
              {new Date(job.postedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>
            Job Description
          </h2>
          <p className='text-gray-700 whitespace-pre-line'>{job.description}</p>
        </div>

        <div className='mt-8 flex gap-4'>
          <Link
            href={`/apply/${job.id}`}
            className='flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
          >
            <Send className='w-4 h-4 mr-2' />
            Apply Now
          </Link>

          <button className='flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition'>
            <Share2 className='w-4 h-4 mr-2' />
            Share Job
          </button>
        </div>
      </div>

      {/* Related Jobs Section */}
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Related Jobs</h2>
          <Link
            href='/jobs'
            className='flex items-center text-green-600 hover:text-green-700 transition'
          >
            View all jobs <ArrowRight className='w-4 h-4 ml-1' />
          </Link>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {relatedJobs.map((relatedJob) => (
            <div
              key={relatedJob.id}
              className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition'
            >
              <h3 className='font-semibold text-lg text-gray-800 mb-1'>
                {relatedJob.title}
              </h3>
              <p className='text-gray-600 text-sm mb-2'>
                {relatedJob.company} • {relatedJob.location}
              </p>
              <div className='flex flex-wrap gap-2 mb-3'>
                <span className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded'>
                  {formatJobType(relatedJob.type)}
                </span>
                <span className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded'>
                  {formatLevel(relatedJob.level)}
                </span>
              </div>
              <Link
                href={`/job-details/${relatedJob.id}`}
                className='text-green-600 text-sm font-medium flex items-center hover:text-green-700'
              >
                View details <ArrowRight className='w-3 h-3 ml-1' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
