import { FC } from 'react'
import Link from 'next/link'

// Sample data for companies (replace this with actual data fetching logic)
const companies = [
  { id: 1, name: 'Company One', industry: 'Tech', location: 'New York, USA' },
  { id: 2, name: 'Company Two', industry: 'Design', location: 'London, UK' },
  {
    id: 3,
    name: 'Company Three',
    industry: 'Finance',
    location: 'San Francisco, USA',
  },
  {
    id: 4,
    name: 'Company Four',
    industry: 'Marketing',
    location: 'Berlin, Germany',
  },
]

const CompaniesPage: FC = () => {
  return (
    <div className='pt-24 p-6 max-w-6xl mx-auto'>
      <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
        <h1 className='text-3xl font-bold text-green-700 capitalize'>
          Registered Companies
        </h1>

        <div className='mt-6'>
          <p className='text-gray-700'>
            Here are the companies that are registered on our platform. Browse
            through the list to learn more about each organization.
          </p>
        </div>

        <div className='mt-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {companies.map((company) => (
              <div
                key={company.id}
                className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition'
              >
                <h2 className='text-xl font-semibold text-gray-800'>
                  {company.name}
                </h2>
                <p className='text-gray-600 text-sm mt-2'>{company.industry}</p>
                <p className='text-gray-500 text-xs mt-2'>{company.location}</p>

                <div className='mt-4'>
                  <Link
                    href={`/company-details/${company.id}`}
                    className='text-green-600 text-sm font-medium flex items-center hover:text-green-700'
                  >
                    View Details
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4 ml-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 12h14M12 5l7 7-7 7'
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompaniesPage
