import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    return Response.json(
      {
        data: item,
        message: "Message Retrieved Successfully",
      },
      { status: 200 }
    );
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
