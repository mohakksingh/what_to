import React, { useEffect, useState } from 'react';
import { Alert } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import useStore from '@/store/useStore';
import { Button } from './ui/button';
import { ThumbsUp } from 'lucide-react';

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Changed to false by default
  const fetchListItems = useStore(state => state.fetchListItems);
  const listId = useStore(state => state.listId);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchListItems(listId);
        setItems(data.items || []);
      } catch (err) {
        setError('Failed to load list items');
        console.error('Error loading items:', err);
      } finally {
        setLoading(false);
      }
    };

    // Only start loading if we have a listId
    if (listId) {
      loadItems();
    } else {
      // Reset states when listId is null
      setItems([]);
      setError('');
      setLoading(false);
    }
  }, [fetchListItems, listId]);

  if (!listId) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Select or create a list to view items</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        {error}
      </Alert>
    );
  }

  if (!items.length) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">No items found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      {items.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t mb-4"
              />
            )}
            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            {item.description && (
              <p className="text-gray-600">{item.description}</p>
            )}
            <div className="flex items-center">
                  <Button variant="outline" onClick={() => handleVote(item.id)}>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {item.votes?.length ?? 0}
                  </Button>
                </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListItems;