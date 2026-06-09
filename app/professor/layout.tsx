import { DashboardShell } from "@/components/dashboard-shell";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="trainer">{children}</DashboardShell>;
}
