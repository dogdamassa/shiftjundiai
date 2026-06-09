"use client";

import { Check, ChevronLeft, ChevronRight, Clock3, Users } from "lucide-react";
import { useMemo, useState } from "react";

const days = [
  { week: "SEG", day: "08", disabled: true },
  { week: "TER", day: "09", today: true },
  { week: "QUA", day: "10" },
  { week: "QUI", day: "11" },
  { week: "SEX", day: "12" },
  { week: "SÁB", day: "13" },
];

const slotsByService = {
  Treino: [
    { id: "demo-training-0600", time: "06:00", professional: "Rafael Mendes", spots: 1 },
    { id: "demo-training-0700", time: "07:00", professional: "Rafael Mendes", spots: 1 },
    { id: "demo-training-0800", time: "08:00", professional: "Rafael Mendes", spots: 2 },
    { id: "demo-training-0900", time: "09:00", professional: "Rafael Mendes", spots: 0 },
    { id: "demo-training-1800", time: "18:00", professional: "Paula Torres", spots: 1 },
    { id: "demo-training-1900", time: "19:00", professional: "Paula Torres", spots: 2 },
  ],
  Recovery: [
    { id: "demo-recovery-0730", time: "07:30", professional: "Camila Nunes", spots: 1 },
    { id: "demo-recovery-1000", time: "10:00", professional: "Camila Nunes", spots: 1 },
    { id: "demo-recovery-1630", time: "16:30", professional: "Camila Nunes", spots: 1 },
    { id: "demo-recovery-1830", time: "18:30", professional: "Camila Nunes", spots: 1 },
  ],
  Fisioterapia: [
    { id: "demo-physio-0800", time: "08:00", professional: "Dr. Lucas Prado", spots: 1 },
    { id: "demo-physio-1400", time: "14:00", professional: "Dr. Lucas Prado", spots: 1 },
  ],
  Nutrição: [
    { id: "demo-nutrition-0930", time: "09:30", professional: "Dra. Beatriz Lima", spots: 1 },
    { id: "demo-nutrition-1700", time: "17:00", professional: "Dra. Beatriz Lima", spots: 1 },
  ],
};

type ServiceName = keyof typeof slotsByService;

export function BookingCalendar() {
  const [service, setService] = useState<ServiceName>("Treino");
  const [day, setDay] = useState("10");
  const [selected, setSelected] = useState<(typeof slotsByService)[ServiceName][number]>();
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const slots = useMemo(() => slotsByService[service], [service]);

  function changeService(next: ServiceName) {
    setService(next);
    setSelected(undefined);
    setConfirmed(false);
    setError(undefined);
  }

  async function confirmBooking() {
    if (!selected) return;
    setSubmitting(true);
    setError(undefined);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selected.id }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível concluir a reserva.");
      }
      setConfirmed(true);
    } catch (bookingError) {
      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Não foi possível concluir a reserva.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="booking-layout">
      <section className="booking-main">
        <div className="service-tabs" role="tablist" aria-label="Serviço">
          {(Object.keys(slotsByService) as ServiceName[]).map((item) => (
            <button
              className={service === item ? "active" : ""}
              key={item}
              onClick={() => changeService(item)}
              role="tab"
              aria-selected={service === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="calendar-heading">
          <div>
            <button aria-label="Semana anterior">
              <ChevronLeft />
            </button>
            <strong>8 a 13 de junho</strong>
            <button aria-label="Próxima semana">
              <ChevronRight />
            </button>
          </div>
          <button>Hoje</button>
        </div>

        <div className="day-strip">
          {days.map((item) => (
            <button
              className={[
                day === item.day ? "active" : "",
                item.today ? "today" : "",
              ].join(" ")}
              disabled={item.disabled}
              key={item.day}
              onClick={() => setDay(item.day)}
            >
              <span>{item.week}</span>
              <strong>{item.day}</strong>
            </button>
          ))}
        </div>

        <div className="slots-heading">
          <div>
            <h2>Horários disponíveis</h2>
            <p>Quarta-feira, {day} de junho</p>
          </div>
          <span>{slots.filter((slot) => slot.spots > 0).length} opções</span>
        </div>

        <div className="slot-grid">
          {slots.map((slot) => (
            <button
              className={selected?.id === slot.id ? "selected" : ""}
              disabled={slot.spots === 0}
              key={slot.time}
              onClick={() => {
                setSelected(slot);
                setConfirmed(false);
              }}
            >
              <Clock3 />
              <strong>{slot.time}</strong>
              <span>{slot.professional}</span>
              <small>
                <Users />{" "}
                {slot.spots === 0
                  ? "Lotado"
                  : `${slot.spots} ${slot.spots === 1 ? "vaga" : "vagas"}`}
              </small>
              {selected?.id === slot.id && <Check className="slot-check" />}
            </button>
          ))}
        </div>
      </section>

      <aside className="booking-summary">
        <span className="dashboard-eyebrow">Resumo da reserva</span>
        <h2>{service}</h2>
        <dl>
          <div>
            <dt>Data</dt>
            <dd>{day} de junho de 2026</dd>
          </div>
          <div>
            <dt>Horário</dt>
            <dd>{selected?.time ?? "Selecione um horário"}</dd>
          </div>
          <div>
            <dt>Local</dt>
            <dd>
              {service === "Recovery"
                ? "Espaço Recovery"
                : "Shift Jundiaí"}
            </dd>
          </div>
        </dl>
        {service !== "Treino" && (
          <div className="credit-summary">
            <span>Saldo disponível</span>
            <strong>{service === "Nutrição" ? "0" : "1"} crédito</strong>
          </div>
        )}
        {confirmed ? (
          <div className="booking-success">
            <Check />
            <div>
              <strong>Reserva confirmada</strong>
              <span>Adicionamos a sessão à sua agenda.</span>
            </div>
          </div>
        ) : (
          <button
            className="dash-button primary wide"
            disabled={!selected || service === "Nutrição" || submitting}
            onClick={confirmBooking}
          >
            {submitting ? "Confirmando..." : "Confirmar reserva"}
          </button>
        )}
        {error && <p className="booking-error">{error}</p>}
        {service === "Nutrição" && (
          <p className="booking-note">
            Seu próximo crédito ainda não foi liberado. Fale com a equipe para
            verificar sessões adicionais.
          </p>
        )}
      </aside>
    </div>
  );
}
