import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;

  if (req.method === "DELETE") {
    const post = await prisma!.post.delete({
      where: { id: postId },
    });
    return res.json(post);
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    if (!session || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content } = req.body;
    const post = await prisma!.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });
    return res.json(post);
  }

  res.setHeader("Allow", ["DELETE", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
