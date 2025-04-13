'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

type NavLink = {
  name: string
  path: string
}

export function Navbar({ navlinks = [] }: { navlinks: NavLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const linkClasses = (path: string) =>
    `text-lg transition-colors duration-200 ${
      pathname === path
        ? 'text-green-600 font-semibold underline'
        : 'text-gray-700 hover:text-green-600'
    }`

  return (
    <div className='w-full border-b border-gray-300 p-4 sm:px-6 md:px-24 flex items-center justify-between bg-white z-50'>
      {/* Logo */}
      <div className='text-3xl font-bold'>
        <Link href='/'>Joobu</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className='block lg:hidden'>
        <button
          className='text-3xl'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle Menu'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-gray-700 bg-opacity-50 z-40'
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>Joobu</h1>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className='mt-8 space-y-4'>
            {navlinks.map((navlink, index) => (
              <li key={index}>
                <Link
                  href={navlink.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={linkClasses(navlink.path)}
                >
                  {navlink.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className='hidden lg:flex space-x-6 items-center'>
        {navlinks.map((navlink, index) => (
          <Link
            key={index}
            href={navlink.path}
            className={linkClasses(navlink.path)}
          >
            {navlink.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
