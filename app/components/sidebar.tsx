// SidebarList Component

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type SidebarFilter = {
  label: string
  value: string
}

type Sidebar = {
  name: string
  options: SidebarFilter[]
}

export function SidebarList({
  sidebarlinks = [],
  onFilterChange,
}: {
  sidebarlinks: Sidebar[]
  onFilterChange: (filterType: string, selectedValues: string[]) => void
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleCheckboxChange = (
    sectionName: string,
    value: string,
    checked: boolean
  ) => {
    const updatedFilters = { ...selectedFilters }
    const currentFilters = updatedFilters[sectionName] || []

    if (checked) {
      updatedFilters[sectionName] = [...currentFilters, value]
    } else {
      updatedFilters[sectionName] = currentFilters.filter((v) => v !== value)
    }

    setSelectedFilters(updatedFilters)
    onFilterChange(sectionName, updatedFilters[sectionName])
  }

  return (
    <div>
      {sidebarlinks.map((sidelink, index) => {
        const isOpen = openSections[sidelink.name]
        return (
          <div key={index}>
            <ul>
              <li
                className='flex gap-2 items-center font-semibold cursor-pointer'
                onClick={() => toggleSection(sidelink.name)}
              >
                {sidelink.name}
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </li>

              {isOpen && sidelink.options.length > 0 && (
                <ul className='ml-4 mt-2 space-y-1'>
                  {sidelink.options.map((option) => (
                    <li
                      key={option.value}
                      className='flex items-center gap-2 text-sm text-gray-700 hover:text-black cursor-pointer'
                    >
                      <input
                        type='checkbox'
                        id={`${sidelink.name}-${option.value}`}
                        name={option.value}
                        value={option.value}
                        className='accent-gray-600'
                        onChange={(e) =>
                          handleCheckboxChange(
                            sidelink.name,
                            option.value,
                            e.target.checked
                          )
                        }
                      />
                      <label htmlFor={`${sidelink.name}-${option.value}`}>
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
