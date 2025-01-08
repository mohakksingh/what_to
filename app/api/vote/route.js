import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  console.log("recevied req");
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { itemId } = await request.json();
    console.log("this is itemId", itemId);
    if (!itemId) {
      return NextResponse.json(
        {
          error: "Item ID is required",
        },
        { status: 400 }
      );
    }
    

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: { votes: true },
    });
    console.log("Found item:", item);
    const existingVote = await prisma.vote.findFirst({
        where: {
          userId: session.user.id,
          itemId: itemId,
        }
      });
      console.log('Existing vote:', existingVote);
      let result;

      if (existingVote) {
        // Remove vote
        result = await prisma.vote.delete({
          where: {
            id: existingVote.id
          }
        });
        console.log('Vote deleted:', result);
      } else {
        // Add vote
        result = await prisma.vote.create({
          data: {
            userId: session.user.id,
            itemId: itemId
          }
        });
        console.log('Vote created:', result);
      }
  
      // 6. Get updated vote count
      const updatedVoteCount = await prisma.vote.count({
        where: { itemId }
      });
  
      return NextResponse.json({
        success: true,
        action: existingVote ? 'removed' : 'added',
        voteCount: updatedVoteCount
      });   
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
