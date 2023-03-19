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
      const { prisma, session } = ctx;
      const userId = session?.user?.id;
      const { where } = input;
      return prisma.post.findMany({
        where,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],

        include: {
          postLikes: {
            where: {
              userId,
            },
            select: {
              userId: true,
            },
          },
          user: {
            select: {
              email: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              postLikes: true,
            },
          },
        },
      });
    }),
  like: protectedProcedure
    .input(
      z.object({
        postId: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { id: userId } = session.user;
      const { postId } = input;
      return prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        postId: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { id: userId } = session.user;
      const { postId } = input;
      return prisma.like.delete({
        where: {
          userId_postId: {
            postId: postId,
            userId: userId,
          },
        },
      });
    }),
  deletePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { postId } = input;
      const { prisma } = ctx;
      return prisma.post.delete({
        where: {
          id: postId,
        },
      });
    }),
});
