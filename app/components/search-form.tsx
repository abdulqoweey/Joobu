'use client'
import React, { useState } from 'react'
import { Search } from 'lucide-react'

export function JobSearchForm({
  onSearch,
}: {
  onSearch: (query: string) => void
}) {
  // State to store the search input
  const [searchTerm, setSearchTerm] = useState('')

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchTerm(query)
    onSearch(query) // Call the onSearch prop immediately when the input changes
  }

  return (
    <form className='relative mb-4 w-full sm:max-w-md'>
      <Search
        className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400'
        size={18}
      />
      <input
        type='text'
        name='search'
        placeholder='Search for jobs...'
        value={searchTerm} // Bind input value to state
        onChange={handleInputChange} // Update state and trigger search on input change
        className='w-full pl-10 pr-4 py-2 border-b border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500'
      />
    </form>
  )
}
