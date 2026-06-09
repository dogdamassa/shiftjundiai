import { describe, expect, it } from "vitest";
import { evaluateBooking } from "@/lib/booking";

describe("evaluateBooking", () => {
  it("permite treino quando ainda existe uma das duas vagas", () => {
    expect(
      evaluateBooking({
        capacity: 2,
        confirmedBookings: 1,
        requiresCredit: false,
        availableCredits: 0,
      }),
    ).toEqual({ allowed: true });
  });

  it("impede uma terceira reserva no mesmo horário", () => {
    expect(
      evaluateBooking({
        capacity: 2,
        confirmedBookings: 2,
        requiresCredit: false,
        availableCredits: 0,
      }),
    ).toEqual({ allowed: false, reason: "capacity" });
  });

  it("exige crédito para serviços configurados", () => {
    expect(
      evaluateBooking({
        capacity: 1,
        confirmedBookings: 0,
        requiresCredit: true,
        availableCredits: 0,
      }),
    ).toEqual({ allowed: false, reason: "credit" });
  });
});
