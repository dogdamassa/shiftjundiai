import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";
import { ShiftLeague } from "@/components/shift-league";

export default function StudentLeaguePage() {
  return (
    <>
      <PageHeader
        eyebrow="Comunidade Shift"
        title="Shift League."
        description="Uma disputa saudável onde presença, constância e compromisso valem mais."
        action={
          <div className="league-live-badge">
            <Trophy /> Temporada de junho
          </div>
        }
      />
      <ShiftLeague />
    </>
  );
}
