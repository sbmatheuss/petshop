import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createAppointment, listAppointments } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  appointments: router({
    create: publicProcedure
      .input(
        z.object({
          tutorName: z.string().min(1, "Nome do tutor é obrigatório"),
          petName: z.string().min(1, "Nome do pet é obrigatório"),
          phone: z.string().min(1, "Telefone é obrigatório"),
          serviceDescription: z.string().min(1, "Descrição do serviço é obrigatória"),
          appointmentDate: z.string().min(1, "Data é obrigatória"),
          appointmentTime: z.string().min(1, "Hora é obrigatória"),
        })
      )
      .mutation(async ({ input }) => {
        const dateObj = new Date(input.appointmentDate);
        const result = await createAppointment({
          tutorName: input.tutorName,
          petName: input.petName,
          phone: input.phone,
          serviceDescription: input.serviceDescription,
          appointmentDate: dateObj,
          appointmentTime: input.appointmentTime,
        });
        return result;
      }),
    list: publicProcedure.query(async () => {
      return await listAppointments();
    }),
  }),
});

export type AppRouter = typeof appRouter;
