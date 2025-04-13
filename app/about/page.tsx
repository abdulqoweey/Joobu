import { FC } from 'react'
import Link from 'next/link'

const AboutPage: FC = () => {
  return (
    <div className='pt-24 p-6 max-w-6xl mx-auto'>
      <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
        <h1 className='text-3xl font-bold text-green-700 capitalize'>
          About Us
        </h1>

        <div className='mt-4'>
          <h2 className='text-2xl font-semibold text-gray-800'>Our Mission</h2>
          <p className='text-gray-700 mt-2'>
            At [Your Company Name], our mission is to revolutionize the way
            designers collaborate and create by providing a platform where
            creatives can connect, share ideas, and work together in real-time.
            We are committed to fostering a vibrant community of designers who
            inspire and support each other.
          </p>
        </div>

        <div className='mt-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>What We Do</h2>
          <p className='text-gray-700 mt-2'>
            We provide a powerful platform for designers to share their
            portfolios, connect with like-minded professionals, and engage in
            real-time design feedback. Our platform supports various features
            like project uploads, live commenting, challenges, and events aimed
            at fostering creativity and skill development.
          </p>
        </div>

        <div className='mt-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>Our Values</h2>
          <ul className='list-disc pl-6 text-gray-700 mt-2'>
            <li>
              Innovation: Constantly pushing the boundaries of design and
              technology.
            </li>
            <li>
              Community: Building a supportive and engaging network for all
              creatives.
            </li>
            <li>
              Collaboration: Promoting teamwork and collective creativity.
            </li>
            <li>
              Empowerment: Helping designers grow by providing tools and
              feedback.
            </li>
          </ul>
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>Get Involved</h2>
          <p className='text-gray-700 mt-2'>
            Whether you're a designer looking to share your work, provide
            feedback, or collaborate on a project, [Your Company Name] is the
            place to be. Join us today and be part of the future of design
            collaboration.
          </p>
          <Link
            href='/sign-up'
            className='mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
          >
            Join Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
