"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ThumbsUp } from "lucide-react";  
import toast, { Toaster } from "react-hot-toast";

const SharePage = ({params}) => {
  const unWrappedParams = React.use(params);
    const { tokenid } = unWrappedParams;
  const [list, setList] = useState(null);
  const [isVoting,setIsVoting]= useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tokenid) return; // Wait until tokenid is available

    const fetchList = async () => {
      try {
        const response = await fetch(`/api/share/${tokenid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch list");
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load the list");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [tokenid]);

  const handleVote = async (itemId) => {
    try {
      setIsVoting(true);
      const response = await fetch(`/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to vote");
      }
  
      const data = await response.json();
  
      // Update the items state with the new vote count
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                votes: Array.from({ length: data.voteCount }), // Simulate votes array
              }
            : item
        )
      );
  
      toast.success(`Vote ${data.action} successfully!`);
    } catch (error) {
      toast.error(error.message || "Failed to process your vote");
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">List not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="text-white mb-10">
        <h1 className="text-5xl font-bold mb-2 text-center">{list.title}</h1>
        <p className="text-gray-600 text-center text-xl">Category: {list.category}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.items?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  {item.description && (
                    <p className="text-gray-600 mb-2">{item.description}</p>
                  )}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="rounded-md max-w-xs mt-2"
                    />
                  )}
                </div>
                <div className="flex items-center">
                  <Button variant="outline" onClick={() => handleVote(item.id)}>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {item.votes?.voteCount ?? 0}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SharePage;