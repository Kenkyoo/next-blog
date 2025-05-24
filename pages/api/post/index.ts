import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
interface PostRequestBody {
  title: string;
  content?: string;
}

interface SessionUser {
  email?: string | null;
}

export default async function handle(
  req: NextApiRequest & { body: PostRequestBody },
  res: NextApiResponse
) {
  const { title, content } = req.body;

  const session = await getServerSession(req, res, authOptions);

  const email = (session?.user as SessionUser)?.email;
  if (!session?.user || !email) {
    res.status(401).json({ error: "Unauthorized or missing email" });
    return;
  }
  const result = await prisma!.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: email } },
    },
  });
  res.json(result);
}
