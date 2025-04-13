import { NextRequest, NextResponse } from 'next/server'

// Import the job data from your job-data.ts file
import { JobData } from '@/app/components/job-data'

// Type for an individual job (inferred from the JobData structure)
type JobDataType = (typeof JobData)[number]

export async function GET(req: NextRequest) {
  // Extract the job ID from the URL path
  const id = req.nextUrl.pathname.split('/').pop()

  // Check if the ID is valid and is a number
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 })
  }

  // Convert the string ID to a number
  const jobId = parseInt(id)

  // Find the job with the corresponding ID
  const job: JobDataType | undefined = JobData.find((job) => job.id === jobId)

  // If the job is not found, return a 404 response
  if (!job) {
    return NextResponse.json({ message: 'Job not found' }, { status: 404 })
  }

  // Return the job data as a JSON response
  return NextResponse.json(job)
}
