import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const list = await prisma.list.findUnique({
            where: {
                id: id,
                creatorId: session.user.id,
            },
            include:{
              items:true
            }
        });

        if (!list) {
            return Response.json(
                { error: "List not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { data: list, message: "List retrieved successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving list:', error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const data = await request.json();
    
    const list = await prisma.list.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        creatorId: session.user.id,
        items: {
          create: data.items.map(item => ({
            name: item.name,
            description: item.description || null, // Handle optional fields
            imageUrl: item.imageUrl || null, // Handle optional fields
          })),
        },
      },
      include: {
        items: true, // Include items in the response
      },
    });

    return new Response(JSON.stringify(list), { status: 200 });
  } catch (e) {
    console.error("Error updating list:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
