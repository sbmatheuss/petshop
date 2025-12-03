import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("appointments", () => {
  describe("appointments.create", () => {
    it("should create an appointment with valid input", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "Helena Souza",
        petName: "Cheddar",
        phone: "(00) 0 0000-0000",
        serviceDescription: "Banho e tosa",
        appointmentDate: "2024-12-15",
        appointmentTime: "12:00",
      };

      const result = await caller.appointments.create(input);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should fail with missing tutorName", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "",
        petName: "Cheddar",
        phone: "(00) 0 0000-0000",
        serviceDescription: "Banho e tosa",
        appointmentDate: "2024-12-15",
        appointmentTime: "12:00",
      };

      try {
        await caller.appointments.create(input);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Nome do tutor");
      }
    });

    it("should fail with missing petName", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "Helena Souza",
        petName: "",
        phone: "(00) 0 0000-0000",
        serviceDescription: "Banho e tosa",
        appointmentDate: "2024-12-15",
        appointmentTime: "12:00",
      };

      try {
        await caller.appointments.create(input);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Nome do pet");
      }
    });

    it("should fail with missing phone", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "Helena Souza",
        petName: "Cheddar",
        phone: "",
        serviceDescription: "Banho e tosa",
        appointmentDate: "2024-12-15",
        appointmentTime: "12:00",
      };

      try {
        await caller.appointments.create(input);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Telefone");
      }
    });

    it("should fail with missing serviceDescription", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "Helena Souza",
        petName: "Cheddar",
        phone: "(00) 0 0000-0000",
        serviceDescription: "",
        appointmentDate: "2024-12-15",
        appointmentTime: "12:00",
      };

      try {
        await caller.appointments.create(input);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Descrição do serviço");
      }
    });

    it("should fail with missing appointmentDate", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "Helena Souza",
        petName: "Cheddar",
        phone: "(00) 0 0000-0000",
        serviceDescription: "Banho e tosa",
        appointmentDate: "",
        appointmentTime: "12:00",
      };

      try {
        await caller.appointments.create(input);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Data");
      }
    });

    it("should fail with missing appointmentTime", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const input = {
        tutorName: "Helena Souza",
        petName: "Cheddar",
        phone: "(00) 0 0000-0000",
        serviceDescription: "Banho e tosa",
        appointmentDate: "2024-12-15",
        appointmentTime: "",
      };

      try {
        await caller.appointments.create(input);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Hora");
      }
    });
  });

  describe("appointments.list", () => {
    it("should list appointments", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.appointments.list();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should return empty array or appointments", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.appointments.list();

      expect(result).toEqual(expect.any(Array));
    });
  });
});
