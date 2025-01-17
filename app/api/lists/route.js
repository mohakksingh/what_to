import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '../auth/[...nextauth]/route'
import { v4 as uuidv4 } from 'uuid' 

const prisma = new PrismaClient()

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const lists = await prisma.list.findMany({
    where: { creatorId: session.user.id },
    include: {
      items: {
        include: {
          votes: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return new Response(JSON.stringify(lists))
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  } 

  try {
    const data = await request.json()
    const shareToken=uuidv4()
    
    // If we have an id, update existing list, otherwise create new
    if (data.id) {
      // Update existing list
      const list = await prisma.list.create({
        where: {
          id: data.id // Use the list ID as unique identifier
        },
        create: {
          id: data.id,
          title: data.title,
          category: data.category,
          creatorId: session.user.id,
          shareToken: shareToken,
          items: {
            create: data.items.map(item => ({
              name: item.name,
              description: item.description || null,
              imageUrl: item.imageUrl || null
            }))
          }
        },
        update: {
          title: data.title,
          category: data.category,
          items: {
            create: data.items.map(item => ({
              name: item.name,
              description: item.description || null,
              imageUrl: item.imageUrl || null
            }))
          }
        },
        include: {
          items: true
        }
      })
      return new Response(JSON.stringify(list), { status: 200 })
    } else {
      // Create new list
      const list = await prisma.list.create({
        data: {
          title: data.title,
          category: data.category,
          shareToken: shareToken,
          creatorId: session.user.id,
          items: {
            create: data.items.map(item => ({
              name: item.name,
              description: item.description || null,
              imageUrl: item.imageUrl || null
            }))
          }
        },
        include: {
          items: true
        }
      })
      return new Response(JSON.stringify(list), { status: 201 })
    }

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

