import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;

  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;
    const userId = session?.user?.id;
    if (!session || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const post = await prisma!.favorite.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return res.json(post);
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;
    const userId = session?.user?.id;

    if (!session || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const post = await prisma!.favorite.upsert({
        where: {
          userId_postId: { userId, postId },
        },
        update: {}, // No se actualiza nada si ya existe
        create: {
          userId,
          postId,
        },
      });
      return res.json(post);
    } catch (error) {
      console.error("Error al agregar favorito:", error);
      return res.status(500).json({ error: "Error al agregar favorito" });
    }
  }

  res.setHeader("Allow", ["DELETE", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
