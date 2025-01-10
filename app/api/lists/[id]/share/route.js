import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const shareToken = uuidv4();
    const list = await prisma.list.update({
      where: {
        id: id,
        creatorId: session.user.id,
      },
      data: {
        shareToken,
      },
    });

    return Response.json(
      { shareToken, message: "Share token generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating share token:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}