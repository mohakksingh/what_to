import React, { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import useStore from "@/store/useStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Shuffle, ThumbsUp } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [randomItem, setRandomItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [loading, setLoading] = useState(false); // Changed to false by default
  const fetchListItems = useStore((state) => state.fetchListItems);
  const listId = useStore((state) => state.listId);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchListItems(listId);
        setItems(data.items || []);
      } catch (err) {
        setError("Failed to load list items");
        console.error("Error loading items:", err);
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
      setError("");
      setLoading(false);
    }
  }, [fetchListItems, listId]);

  if (!listId) {
    return (
      <div className="flex justify-center items-center p-8 w-full">
        <p className="text-gray-500">Create a list to view items</p>
      </div>
    );
  }

  const handleVote = async (itemId) => {
    try {
      setIsVoting(true);
      console.log(JSON.stringify({itemId}))
      const response = await fetch(`/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
      console.log(response)
      if (!response.ok) {
        const error = await response.json();
      }
      const data = await response.json();
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId
            ? {
                ...item,
                // Ensure votes is always an array
                votes: Array.isArray(item.votes) 
                  ? data.action === 'added'
                    ? [...item.votes, { id: 'temp' }]  // Add temporary vote
                    : item.votes.slice(0, -1)  // Remove one vote
                  : data.action === 'added' 
                    ? [{ id: 'temp' }]  // Create new votes array
                    : []  // Empty array if removing vote
              }
            : item
        )
      );
      toast.success("Your vote has been recorded");
    } catch (error) {
      toast.error(error.message || "Failed to process your vote");
    } finally {
      setIsVoting(false);
    }
  };

  const handleRandom = (items) => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setRandomItem(items[randomIndex]);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 w-full">
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
    <div className="container mx-auto py-8 px-4">
      <Toaster />
      <div className="flex flex-col w-full gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-6">
              {item.imageUrl && (
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleVote(item.id)}
                  className="flex items-center gap-2 hover:bg-gray-100"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{item.votes?.length ?? 0}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4">
          <span className="text-gray-700">Still confused?</span>
          <Button
            variant="default"
            onClick={() => handleRandom(items)}
            className="flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Randomize
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Random Selection</DialogTitle>
            <DialogDescription>
              Here's a random item that might interest you
            </DialogDescription>
          </DialogHeader>
          {randomItem && (
            <div className="mt-4">
              {randomItem.imageUrl && (
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={randomItem.imageUrl}
                    alt={randomItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="font-bold text-xl mb-3">{randomItem.name}</h3>
              {randomItem.description && (
                <p className="text-gray-600">{randomItem.description}</p>
              )}
              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleVote(randomItem.id)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{randomItem.votes?.length ?? 0}</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListItems;
