export interface BookingRuleInput {
  capacity: number;
  confirmedBookings: number;
  requiresCredit: boolean;
  availableCredits: number;
}

export type BookingRuleResult =
  | { allowed: true }
  | { allowed: false; reason: "capacity" | "credit" | "invalid_capacity" };

export function evaluateBooking(input: BookingRuleInput): BookingRuleResult {
  if (input.capacity < 1) {
    return { allowed: false, reason: "invalid_capacity" };
  }

  if (input.confirmedBookings >= input.capacity) {
    return { allowed: false, reason: "capacity" };
  }

  if (input.requiresCredit && input.availableCredits < 1) {
    return { allowed: false, reason: "credit" };
  }

  return { allowed: true };
}
