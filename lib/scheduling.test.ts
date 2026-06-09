import { describe, expect, it } from "vitest";
import {
  canBookActivePlan,
  canSelfCheckIn,
  getBookingWindow,
} from "@/lib/scheduling";

const startsAt = new Date("2026-06-17T12:00:00.000Z");

describe("regras de agenda Shift", () => {
  it("abre a reserva exatamente sete dias antes", () => {
    expect(
      getBookingWindow({
        now: new Date("2026-06-10T12:00:00.000Z"),
        startsAt,
      }).isOpen,
    ).toBe(true);
  });

  it("fecha reserva e cancelamento dez minutos antes", () => {
    expect(
      getBookingWindow({
        now: new Date("2026-06-17T11:50:00.000Z"),
        startsAt,
      }).isClosed,
    ).toBe(true);
  });

  it("permite check-in entre dez minutos antes e trinta depois", () => {
    expect(
      canSelfCheckIn({
        hasBooking: true,
        alreadyCheckedIn: false,
        now: new Date("2026-06-17T12:20:00.000Z"),
        startsAt,
      }),
    ).toEqual({ allowed: true });
  });

  it("impede check-in sem reserva ou duplicado", () => {
    expect(
      canSelfCheckIn({
        hasBooking: false,
        alreadyCheckedIn: false,
        now: startsAt,
        startsAt,
      }),
    ).toEqual({ allowed: false, reason: "no_booking" });
    expect(
      canSelfCheckIn({
        hasBooking: true,
        alreadyCheckedIn: true,
        now: startsAt,
        startsAt,
      }),
    ).toEqual({ allowed: false, reason: "already_checked_in" });
  });

  it("exige plano ativo e acesso liberado", () => {
    expect(canBookActivePlan({ planActive: false, accessSuspended: false })).toEqual({
      allowed: false,
      reason: "inactive_plan",
    });
    expect(canBookActivePlan({ planActive: true, accessSuspended: true })).toEqual({
      allowed: false,
      reason: "suspended",
    });
  });
});
