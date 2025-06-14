import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const recallRouter = createTRPCRouter({
  // Create a new recall request
  create: publicProcedure
    .input(
      z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
        customerAddress: z.string().min(1),
        productName: z.string().min(1),
        productModel: z.string().min(1),
        serialNumber: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.recallRequest.create({
        data: input,
      });
    }),

  // Get all recall requests (admin only)
  getAll: protectedProcedure
    .input(
      z.object({
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      // Check if user exists and is admin
      if (!ctx.session?.user?.id) {
        throw new Error("Unauthorized - Login required");
      }

      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (user?.role !== "ADMIN") {
        throw new Error("Unauthorized - Admin access required");
      }

      return ctx.db.recallRequest.findMany({
        where: {
          status: input?.status,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  // Get single recall request by ID (public for status check)
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.recallRequest.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          customerName: true,
          productName: true,
          productModel: true,
          serialNumber: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }),

  // Update recall request status (admin only)
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user exists and is admin
      if (!ctx.session?.user?.id) {
        throw new Error("Unauthorized - Login required");
      }

      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (user?.role !== "ADMIN") {
        throw new Error("Unauthorized - Admin access required");
      }

      return ctx.db.recallRequest.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});