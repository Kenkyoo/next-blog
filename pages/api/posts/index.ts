// pages/api/posts/posts.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 1;
  const pageSize = 5;

  try {
    const [feed, totalPosts] = await prisma!.$transaction([
      prisma!.post.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: { published: true },
        include: {
          author: {
            select: { name: true },
          },
          tags: {
            select: { name: true },
          },
        },
      }),
      prisma!.post.count({
        where: { published: true },
      }),
    ]);

    res.json({
      feed,
      totalPosts,
      currentPage: page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
