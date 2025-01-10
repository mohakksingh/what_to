"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useStore from "@/store/useStore";

export default function CreateList() {
  const router = useRouter();
  const [error, setError] = useState("");
  const createList = useStore((state) => state.createList);
  const updateList = useStore((state) => state.updateList);
  const fetchItems = useStore((state) => state.fetchListItems);
  const listId = useStore((state) => state.listId);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { name: "", description: "", imageUrl: "" },
  ]);

  const addItemField = () => {
    setItems([...items, { name: "", description: "", imageUrl: "" }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };


  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.target)
    const listData = {
      title: formData.get('title'),
      category: formData.get('category'),
      items: items.filter(item => item.name.trim() !== '') // Only include items with names
    }

    try {
        if(listId===null){
            await createList(listData)
        }else{
            await updateList(listData,listId)
        }
      await fetchItems(listId)
      console.log(listId)
    }catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl  p-6">
        <h1 className="text-2xl font-bold mb-6">Create New WhatTo List</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">List Title</label>
            <Input name="title" placeholder="Enter list title" required />
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

          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">Items</label>
            {items.map((item, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  required={index === 0}
                />
                <Input
                  placeholder="Description (optional)"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={item.imageUrl}
                  onChange={(e) =>
                    updateItem(index, "imageUrl", e.target.value)
                  }
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addItemField}
              className="mt-2"
            >
              Add Another Item
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            
            {listId ? "Update List" : "Create List"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
