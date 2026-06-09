export type UserRole = "admin" | "trainer" | "student";

export type AppointmentStatus = "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  service:
    | "Treino"
    | "Shift Flow"
    | "Shift Move"
    | "Recovery"
    | "Fisioterapia"
    | "Nutrição";
  professional: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  location: string;
}

export interface Credit {
  service: "Recovery" | "Fisioterapia" | "Nutrição";
  available: number;
  nextRenewal?: string;
  detail: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  load: string;
  rest: string;
  completed?: boolean;
}

export type ClassKind = "Treino" | "Shift Flow" | "Shift Move";

export type AttendanceState =
  | "booked"
  | "checked_in"
  | "absent"
  | "cancelled";

export interface ExtraClass {
  id: string;
  kind: ClassKind;
  subtitle: string;
  date: string;
  dayLabel: string;
  time: string;
  professional: string;
  location: string;
  capacity: number;
  booked: number;
  duration: number;
  bookingState: "open" | "booked" | "full" | "soon";
  attendance: AttendanceState;
}

export type InvoiceStatus =
  | "pending"
  | "paid"
  | "overdue"
  | "cancelled"
  | "exempt";

export interface Invoice {
  id: string;
  reference: string;
  dueDate: string;
  paidAt?: string;
  amount: number;
  discount?: number;
  status: InvoiceStatus;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  expiresAt?: string;
  priority: "normal" | "important" | "urgent";
  pinned: boolean;
  read: boolean;
  image?: string;
}

export interface PublicProfessional {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  modalities: string[];
  bio: string;
  image: string;
  imagePosition?: string;
  instagram?: string;
}

export interface LeagueMember {
  position: number;
  name: string;
  initials: string;
  checkins: number;
  streak: number;
  movement: "up" | "down" | "same";
  isCurrentStudent?: boolean;
}

export interface LeagueAchievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
}
