export const SHIFT_TIME_ZONE = "America/Sao_Paulo";
export const BOOKING_OPEN_DAYS = 7;
export const BOOKING_CLOSE_MINUTES = 10;
export const CHECKIN_CLOSE_MINUTES = 30;

export interface ScheduleWindowInput {
  now: Date;
  startsAt: Date;
}

export function getBookingWindow({ now, startsAt }: ScheduleWindowInput) {
  const opensAt = new Date(
    startsAt.getTime() - BOOKING_OPEN_DAYS * 24 * 60 * 60 * 1000,
  );
  const closesAt = new Date(
    startsAt.getTime() - BOOKING_CLOSE_MINUTES * 60 * 1000,
  );

  return {
    opensAt,
    closesAt,
    isOpen: now >= opensAt && now < closesAt,
    isTooEarly: now < opensAt,
    isClosed: now >= closesAt,
  };
}

export function getCheckinWindow({ now, startsAt }: ScheduleWindowInput) {
  const opensAt = new Date(
    startsAt.getTime() - BOOKING_CLOSE_MINUTES * 60 * 1000,
  );
  const closesAt = new Date(
    startsAt.getTime() + CHECKIN_CLOSE_MINUTES * 60 * 1000,
  );

  return {
    opensAt,
    closesAt,
    isOpen: now >= opensAt && now <= closesAt,
    isTooEarly: now < opensAt,
    isClosed: now > closesAt,
  };
}

export function canBookActivePlan(input: {
  planActive: boolean;
  accessSuspended: boolean;
}) {
  if (!input.planActive) return { allowed: false, reason: "inactive_plan" } as const;
  if (input.accessSuspended) return { allowed: false, reason: "suspended" } as const;
  return { allowed: true } as const;
}

export function canSelfCheckIn(input: {
  hasBooking: boolean;
  alreadyCheckedIn: boolean;
  now: Date;
  startsAt: Date;
}) {
  if (!input.hasBooking) return { allowed: false, reason: "no_booking" } as const;
  if (input.alreadyCheckedIn) {
    return { allowed: false, reason: "already_checked_in" } as const;
  }

  const window = getCheckinWindow(input);
  if (window.isTooEarly) return { allowed: false, reason: "too_early" } as const;
  if (window.isClosed) return { allowed: false, reason: "closed" } as const;
  return { allowed: true } as const;
}
