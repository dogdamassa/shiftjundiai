import { Check, Circle, Dumbbell, Info, Timer } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard-ui";
import { todayWorkout } from "@/lib/demo-data";

export default function StudentWorkoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Performance B · Semana 08"
        title="Seu treino de hoje."
        description="Inferiores, costas e ombros · Aproximadamente 58 minutos"
        action={
          <button className="dash-button primary">
            <Dumbbell /> Iniciar treino
          </button>
        }
      />
      <div className="workout-layout">
        <Panel
          title="Bloco de força"
          subtitle="Priorize técnica e amplitude em todas as séries"
        >
          <div className="exercise-list">
            {todayWorkout.map((exercise, index) => (
              <article key={exercise.name}>
                <button
                  className={
                    exercise.completed ? "exercise-check completed" : "exercise-check"
                  }
                  aria-label={`Marcar ${exercise.name} como concluído`}
                >
                  {exercise.completed ? <Check /> : <Circle />}
                </button>
                <div className="exercise-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="exercise-copy">
                  <h3>{exercise.name}</h3>
                  <div>
                    <span>
                      <strong>{exercise.sets}</strong> séries
                    </span>
                    <span>
                      <strong>{exercise.reps}</strong> reps
                    </span>
                    <span>
                      <strong>{exercise.load}</strong> carga
                    </span>
                    <span>
                      <Timer /> {exercise.rest}
                    </span>
                  </div>
                </div>
                <button className="icon-button" aria-label="Detalhes do exercício">
                  <Info />
                </button>
              </article>
            ))}
          </div>
        </Panel>
        <aside className="workout-aside">
          <div className="coach-note">
            <span>Nota do professor</span>
            <p>
              Marina, hoje vamos manter o foco no controle da descida. Não
              aumente a carga do hack sem me chamar.
            </p>
            <strong>Rafael Mendes</strong>
          </div>
          <div className="workout-progress-card">
            <span>Progresso do treino</span>
            <strong>1 / 4</strong>
            <div>
              <i style={{ width: "25%" }} />
            </div>
            <small>Você está indo muito bem. Continue.</small>
          </div>
        </aside>
      </div>
    </>
  );
}
