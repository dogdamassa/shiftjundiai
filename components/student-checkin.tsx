"use client";

import { Check, CheckCircle2, Clock3, MapPin, QrCode, Trophy } from "lucide-react";
import { useState } from "react";

export function StudentCheckin() {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <section className={checkedIn ? "student-checkin done" : "student-checkin"}>
      <div className="checkin-time">
        <Clock3 />
        <strong>09:00</strong>
        <span>Hoje</span>
      </div>
      <div className="checkin-main">
        <span className="status-pill">Janela aberta</span>
        <h2>Performance B · Inferiores</h2>
        <p><MapPin /> Sala Performance · com Rafael Mendes</p>
        <small>Check-in disponível até 09:30.</small>
      </div>
      {checkedIn ? (
        <div className="checkin-complete-wrap">
          <div className="checkin-confirmed">
            <CheckCircle2 />
            <strong>Presença confirmada</strong>
            <span>09:02 · Tudo pronto para começar.</span>
          </div>
          <div className="checkin-league-reward" role="status">
            <Trophy />
            <div>
              <strong>+1 na Shift League</strong>
              <span>12 check-ins · você encostou no Top 4.</span>
            </div>
          </div>
        </div>
      ) : (
        <button className="dash-button primary" onClick={() => setCheckedIn(true)}>
          <QrCode /> Fazer check-in
        </button>
      )}
      {checkedIn && <Check className="checkin-watermark" />}
    </section>
  );
}
