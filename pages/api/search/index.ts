// pages/api/search/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 1;
  const pageSize = 5;
  const query = String(req.query.query || ""); // Asegúrate de manejar el caso donde query es undefined

  // Construye la condición de búsqueda
  const searchCondition = {
    published: true,
    ...(query && {
      // Solo añade la condición de título si hay una query
      title: {
        contains: query,
        mode: "insensitive" as const,
      },
    }),
  };

  try {
    const [feed, totalPosts] = await prisma!.$transaction([
      prisma!.post.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: searchCondition, // Usa la condición de búsqueda
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
        where: searchCondition, // ¡Importante! Usa la misma condición de búsqueda aquí
      }),
    ]);

    res.json({
      feed,
      totalPosts,
      currentPage: page,
      pageSize,
      query, // Opcional: devolver la query para depuración o confirmación
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
