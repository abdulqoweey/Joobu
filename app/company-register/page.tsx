'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'

const CompanyRegisterPage: FC = () => {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [companyType, setCompanyType] = useState('LLC')
  const [taxIdentificationNumber, setTaxIdentificationNumber] = useState('')
  const [annualRevenue, setAnnualRevenue] = useState('')
  const [socialMedia, setSocialMedia] = useState({
    linkedin: '',
    twitter: '',
    facebook: '',
  })
  const [ceoName, setCeoName] = useState('')
  const [numberOfLocations, setNumberOfLocations] = useState(1)
  const [businessHours, setBusinessHours] = useState('')
  const [primaryProductService, setPrimaryProductService] = useState('')
  const [companyLogoURL, setCompanyLogoURL] = useState('')
  const [customerSupportEmail, setCustomerSupportEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          email,
          address,
          password,
          companyType,
          taxIdentificationNumber,
          annualRevenue,
          socialMedia,
          ceoName,
          numberOfLocations,
          businessHours,
          primaryProductService,
          companyLogoURL,
          customerSupportEmail,
        }),
      })

      const data = await res.json()

      if (res.status === 200) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl'>
        <h1 className='text-2xl font-semibold text-center text-green-700 mb-6'>
          Register Your Company
        </h1>

        {error && (
          <div className='text-red-500 text-sm text-center mb-4'>{error}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          {/* Company Info */}
          <input
            type='text'
            placeholder='Company Name'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className='input'
          />
          <input
            type='text'
            placeholder='Company Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className='input'
          />
          <input
            type='email'
            placeholder='Company Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='input'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='input'
          />

          {/* Business Info */}
          <select
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            className='input'
          >
            <option value='LLC'>LLC</option>
            <option value='S Corporation'>S Corporation</option>
            <option value='C Corporation'>C Corporation</option>
            <option value='B Corporation'>B Corporation</option>
          </select>
          <input
            type='text'
            placeholder='Tax ID Number'
            value={taxIdentificationNumber}
            onChange={(e) => setTaxIdentificationNumber(e.target.value)}
            className='input'
          />
          <input
            type='text'
            placeholder='Annual Revenue'
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(e.target.value)}
            className='input'
          />
          <input
            type='text'
            placeholder='CEO Name'
            value={ceoName}
            onChange={(e) => setCeoName(e.target.value)}
            className='input'
          />

          <input
            type='number'
            placeholder='Number of Locations'
            value={numberOfLocations}
            onChange={(e) => setNumberOfLocations(Number(e.target.value))}
            className='input'
          />
          <input
            type='text'
            placeholder='Business Hours'
            value={businessHours}
            onChange={(e) => setBusinessHours(e.target.value)}
            className='input'
          />
          <input
            type='text'
            placeholder='Primary Product / Service'
            value={primaryProductService}
            onChange={(e) => setPrimaryProductService(e.target.value)}
            className='input'
          />
          <input
            type='text'
            placeholder='Company Logo URL'
            value={companyLogoURL}
            onChange={(e) => setCompanyLogoURL(e.target.value)}
            className='input'
          />

          {/* Social Media */}
          <input
            type='text'
            placeholder='LinkedIn URL'
            value={socialMedia.linkedin}
            onChange={(e) =>
              setSocialMedia({ ...socialMedia, linkedin: e.target.value })
            }
            className='input'
          />
          <input
            type='text'
            placeholder='Twitter URL'
            value={socialMedia.twitter}
            onChange={(e) =>
              setSocialMedia({ ...socialMedia, twitter: e.target.value })
            }
            className='input'
          />
          <input
            type='text'
            placeholder='Facebook URL'
            value={socialMedia.facebook}
            onChange={(e) =>
              setSocialMedia({ ...socialMedia, facebook: e.target.value })
            }
            className='input'
          />
          <input
            type='email'
            placeholder='Customer Support Email'
            value={customerSupportEmail}
            onChange={(e) => setCustomerSupportEmail(e.target.value)}
            className='input'
          />

          {/* Submit */}
          <div className='col-span-1 md:col-span-2'>
            <button
              type='submit'
              className='w-full bg-green-700 text-white py-2 px-4 rounded-lg'
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyRegisterPage
