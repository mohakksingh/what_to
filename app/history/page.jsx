'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDistance } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/ui/alert'

export default function HistoryPage() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await fetch('/api/lists')
        if (!response.ok) throw new Error('Failed to fetch lists')
        const data  = await response.json()
        setLists(data)
      } catch (error) {
        setError('Failed to load history')
      } finally {
        setLoading(false)
      }
    }

    fetchLists()
  }, [])

  const handleListClick = (listId) => {
    router.push(`/history/${listId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your History</h1>
      
      <div className="grid gap-6">
        {lists.map((list) => (
          <Card 
            key={list.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleListClick(list.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{list.title}</h2>
                <span className="text-sm text-gray-500">
                  {formatDistance(new Date(list.createdAt), new Date(), { addSuffix: true })}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">Category: {list.category}</p>
                <p className="text-gray-600">
                  Items: {list.items?.length ?? 0}
                </p>
                {list.items?.length > 0 && (
                  <p className="text-gray-600">
                    Most voted: {
                      list.items.reduce((prev, current) => 
                        ((prev.votes?.length ?? 0) > (current.votes?.length ?? 0)) ? prev : current
                      ).name
                    }
                  </p>
                )}
                <Button 
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleListClick(list.id);
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {lists.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No lists created yet.</p>
              <Button asChild className="mt-4">
                <Link href="/lists/create">Create Your First List</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}