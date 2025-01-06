import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await request.json();
  let imageUrl = null;

  if (data.image) {
    const uploadResult = await uploadImage(data.image);
    imageUrl = uploadResult.secure_url;
  }

  const item = await prisma.item.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl,
      listId: data.listId,
    },
  });

  return new Response(JSON.stringify(item));
}

export async function GET(request, { params }) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const item = await prisma.item.findUnique({
      where: {
        id: id,
        creatorId: session.user.id,
      },
      include: {
        votes: true,
      },
    });

    if (!item) {
      return new Response("Item not found");
    }

    
  } catch (e) {
    console.error("Error retrieving item: ", e);
    return Response.json(
      {
        e: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
