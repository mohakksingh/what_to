import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id, itemId } = params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        // First verify that the list belongs to the current user
        const list = await prisma.list.findUnique({
            where: {
                id: id,
                creatorId: session.user.id,
            },
        });

        if (!list) {
            return Response.json(
                { error: "List not found or unauthorized" },
                { status: 404 }
            );
        }

        // Then find the item within that list
        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
                listId: id,
            },
            include: {
                votes: true,
            },
        });

        if (!item) {
            return Response.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { 
                data: item,
                message: "Item received successfully"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving item:", error);
        return Response.json(
            { 
                error: "Internal Server Error",
                details: error.message
            },
            { status: 500 }
        );
    }
}