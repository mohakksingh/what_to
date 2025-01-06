"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";

const HistoryItem = ({ params }) => {
  const unWrappedParams=React.use(params)
  const {id} = unWrappedParams;
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchListDetails() {
      try {
        const response = await fetch(`/api/lists/${id}`);
        if (!response.ok) throw new Error("Failed to fetch list details");
        const data = await response.json();
        setList(data.data);
        console.log(list);
      } catch (error) {
        setError("Failed to load list details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchListDetails();
    }
  }, [id]);

  const handleVote = async (itemId) => {
    try {
      const response = await fetch(`/api/lists/${id}/item/${itemId}/vote`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to vote");

      // Refresh the list data
      const updatedListResponse = await fetch(`/api/lists/${id}`);
      const { data } = await updatedListResponse.json();
      setList(data);
    } catch (error) {
      setError("Failed to vote");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">List not found</Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-3xl font-bold">{list.title}</h1>
          <p className="text-gray-600">Category: {list.category}</p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
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
                    {item.votes?.length ?? 0}
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

export default HistoryItem;
