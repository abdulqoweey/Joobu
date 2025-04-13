'use client'

import { JobListing } from './components/job-listing'
import { JobData } from './components/job-data'
import { UserCircle, Building2 } from 'lucide-react'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <div className='pt-20 px-4 md:px-16 lg:px-20 xl:px-32 grid grid-cols-1 md:grid-cols-12 gap-6'>
        {/* Left Sidebar: Featured Company + Career Tips */}
        <div className='col-span-1 md:col-span-3 lg:col-span-3 space-y-6'>
          {/* Featured Company */}
          <section className='bg-white rounded-lg shadow p-4'>
            <h2 className='text-lg font-semibold mb-2'>Featured Company</h2>
            <div className='flex items-center gap-3'>
              <div className='bg-gray-100 p-2 rounded-full'>
                <Building2 className='w-6 h-6 text-gray-600' />
              </div>
              <div>
                <p className='font-medium'>TechNova</p>
                <p className='text-sm text-gray-500'>Hiring React Developers</p>
              </div>
            </div>
          </section>

          {/* Career Tips */}
          <section className='bg-white rounded-lg shadow p-4'>
            <h2 className='text-lg font-semibold mb-2'>Career Tips</h2>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>✔ Tailor your resume for each job</li>
              <li>✔ Showcase your GitHub/portfolio</li>
              <li>✔ Keep learning new tools</li>
            </ul>
          </section>
        </div>

        {/* Job Listings */}
        <div className='col-span-1 md:col-span-6 lg:col-span-6 h-[80vh] bg-gray-50 md:overflow-y-auto rounded-lg p-4 shadow-sm'>
          <JobListing joblisting={JobData} />
        </div>

        {/* Right Sidebar: User Preview */}
        <div className='col-span-1 md:col-span-3 lg:col-span-3 hidden md:block'>
          <section className='bg-white rounded-lg shadow p-4'>
            <h2 className='text-lg font-semibold mb-2'>Welcome back</h2>
            <div className='flex items-center gap-4'>
              <div className='bg-gray-100 p-2 rounded-full'>
                <UserCircle className='w-10 h-10 text-gray-600' />
              </div>
              <div>
                <p className='font-medium'>John Doe</p>
                <p className='text-sm text-gray-500'>Frontend Developer</p>
              </div>
            </div>

            <div className='mt-4 text-sm text-gray-600'>
              <p>👀 3 job matches today</p>
              <p>📨 1 new message</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
