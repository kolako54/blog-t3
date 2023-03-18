import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  //   post: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .mutation(({ input }) => {
  //       return {
  //         greeting: `Hello ${input.text}`,
  //       };
  //     }),
  post: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
      const { prisma, session } = ctx;
      const userId = session.user.id;
      const { text } = input;
      return prisma.post.create({
        data: {
          text,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  getPosts: publicProcedure
    .input(
      z.object({
        where: z
          .object({
            user: z
              .object({
                name: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { prisma } = ctx;
      const { where } = input;
      return prisma.post.findMany({
        where,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],

        include: {
          user: {
            select: {
              email: true,
              name: true,
              image: true,
            },
          },
        },
      });
    }),
});
