import { PrismaClient } from '@prisma/client'
import { createUser } from '@/utils/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 400 }
      )
    }

    // Create new user
    const user = await createUser(email, password)

    return new Response(
      JSON.stringify({ message: 'User created successfully', user }),
      { status: 201 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    )
  }
}