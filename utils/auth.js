import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(email, password) {
  const hashedPassword = await hash(password, 12)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })
  
  return { id: user.id, email: user.email }
}