import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  console.log("Received request");
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { itemId } = await request.json();
    console.log("Item ID:", itemId);

    // Validate itemId
    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Check if the item exists
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // Check if the user has already voted for this item
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        itemId: itemId,
      },
    });

    console.log("Existing vote:", existingVote);

    let result;
    let action;

    if (existingVote) {
      // If the user has already voted, remove the vote
      result = await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });
      action = "removed";
      console.log("Vote deleted:", result);
    } else {
      // If the user hasn't voted, add a new vote
      result = await prisma.vote.create({
        data: {
          userId: session.user.id,
          itemId: itemId,
        },
      });
      action = "added";
      console.log("Vote created:", result);
    }

    // Get the updated vote count for the item
    const updatedVoteCount = await prisma.vote.count({
      where: { itemId },
    });

    // Return the response with the action and updated vote count
    return NextResponse.json({
      success: true,
      action: action,
      voteCount: updatedVoteCount,
    });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}