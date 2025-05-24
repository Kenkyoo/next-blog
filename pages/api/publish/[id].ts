import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@prisma/client";

if (!prisma) {
  throw new Error("Prisma client is not initialized.");
}

// PUT /api/publish/:id
interface PublishRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

interface PublishResponse extends NextApiResponse {
  json: (body: Post) => void;
}

export default async function handle(
  req: PublishRequest,
  res: PublishResponse
) {
  const postId = req.query.id;
  const post: Post = await prisma!.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}
