import { NextResponse } from 'next/server'

const mockUser = {
  email: 'ak.qoweey@example.com',
  password: 'password123@', // Plain text password
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Check if the email exists in the mock user data
    if (email !== mockUser.email) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if the password is correct
    if (password !== mockUser.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return success response (you could return a JWT or session here)
    return NextResponse.json({ message: 'Login successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
