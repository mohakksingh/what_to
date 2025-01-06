'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import useStore from '@/store/useStore'

export default function CreateListPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { setCurrentList } = useStore()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.target)
    const title = formData.get('title')
    const category = formData.get('category')

    try {
      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category })
      })

      if (!response.ok) throw new Error('Failed to create list')

      const list = await response.json()
      setCurrentList(list)
      router.push('/main')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New WhatTo List</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">List Title</label>
            <Input
              name="title"
              placeholder="Enter list title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Places">Places</option>
              <option value="Music">Music</option>
              <option value="Cars">Cars</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create List'}
          </Button>
        </form>
      </Card>
    </div>
  )
}