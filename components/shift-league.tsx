"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  Check,
  ChevronRight,
  Crown,
  Flame,
  LockKeyhole,
  Medal,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { leagueAchievements, leagueRanking } from "@/lib/demo-data";

export function ShiftLeaguePreview() {
  const current = leagueRanking.find((member) => member.isCurrentStudent)!;
  const next = leagueRanking[current.position - 2];
  const distance = next.checkins - current.checkins;

  return (
    <div className="league-preview">
      <div className="league-preview-position">
        <span>Sua posição</span>
        <strong>#{current.position}</strong>
        <small>+2 posições nesta semana</small>
      </div>
      <div className="league-preview-copy">
        <span className="league-kicker"><Trophy /> Shift League · Junho</span>
        <h3>Você está no ritmo.</h3>
        <p>
          Mais {distance} check-in{distance === 1 ? "" : "s"} para alcançar{" "}
          <strong>{next.name}</strong> e entrar no Top 4.
        </p>
        <div className="league-progress">
          <i style={{ width: `${(current.checkins / next.checkins) * 100}%` }} />
        </div>
      </div>
      <Link className="league-preview-link" href="/aluno/league">
        Ver ranking <ArrowRight />
      </Link>
    </div>
  );
}

export function ShiftLeague() {
  const [period, setPeriod] = useState<"month" | "all">("month");
  const current = leagueRanking.find((member) => member.isCurrentStudent)!;
  const remaining = 20 - current.checkins;

  return (
    <div className="shift-league">
      <section className="league-hero">
        <div className="league-hero-copy">
          <span className="dashboard-eyebrow">Constância em movimento</span>
          <h2>SHIFT<br /><em>LEAGUE.</em></h2>
          <p>
            Cada presença conta. A competição existe para celebrar quem mantém
            o compromisso com o próprio processo.
          </p>
          <div className="league-rules">
            <span><Check /> 1 check-in válido = 1 ponto</span>
            <span><Check /> Ranking reinicia todo mês</span>
            <span><Check /> Flow e Move também contam</span>
          </div>
        </div>
        <div className="league-personal-score">
          <div>
            <Trophy />
            <span>Sua posição</span>
          </div>
          <strong>#{current.position}</strong>
          <p><b>{current.checkins}</b> check-ins em junho</p>
          <small><ArrowUp /> Você subiu 2 posições nesta semana</small>
        </div>
      </section>

      <div className="league-tabs">
        <button className={period === "month" ? "active" : ""} onClick={() => setPeriod("month")}>
          Junho
        </button>
        <button className={period === "all" ? "active" : ""} onClick={() => setPeriod("all")}>
          Histórico geral
        </button>
        <span>Atualizado após cada check-in</span>
      </div>

      {period === "month" ? (
        <>
          <section className="league-podium" aria-label="Pódio mensal">
            {[leagueRanking[1], leagueRanking[0], leagueRanking[2]].map((member) => (
              <article className={`podium-place position-${member.position}`} key={member.position}>
                {member.position === 1 && <Crown className="podium-crown" />}
                <div className="podium-avatar">{member.initials}</div>
                <span>{member.position}º lugar</span>
                <h3>{member.name}</h3>
                <strong>{member.checkins}</strong>
                <small>check-ins</small>
                <i />
              </article>
            ))}
          </section>

          <div className="league-main-grid">
            <section className="league-table">
              <header>
                <div>
                  <span className="dashboard-eyebrow">Ranking mensal</span>
                  <h2>Quem está em movimento</h2>
                </div>
                <Medal />
              </header>
              <div className="league-table-head">
                <span>Posição</span>
                <span>Aluno</span>
                <span>Sequência</span>
                <span>Check-ins</span>
              </div>
              {leagueRanking.map((member) => (
                <article
                  className={member.isCurrentStudent ? "current-student" : ""}
                  key={member.position}
                >
                  <div className="league-position">
                    <strong>{String(member.position).padStart(2, "0")}</strong>
                    {member.movement === "up" && <ArrowUp />}
                    {member.movement === "down" && <ArrowDown />}
                  </div>
                  <div className="league-person">
                    <div className="avatar avatar-small">{member.initials}</div>
                    <div>
                      <strong>{member.name}</strong>
                      {member.isCurrentStudent && <span>Você</span>}
                    </div>
                  </div>
                  <span className="league-streak"><Flame /> {member.streak} sem.</span>
                  <strong className="league-checkins">{member.checkins}</strong>
                </article>
              ))}
            </section>

            <aside className="league-side">
              <section className="league-next-level">
                <span className="dashboard-eyebrow">Próximo marco</span>
                <div><Sparkles /><strong>Nível 4</strong></div>
                <h3>20 em movimento</h3>
                <p>Faltam {remaining} check-ins para desbloquear o próximo nível.</p>
                <div className="league-level-track">
                  <i style={{ width: `${(current.checkins / 20) * 100}%` }} />
                </div>
                <small>{current.checkins} / 20 check-ins</small>
              </section>

              <section className="league-privacy">
                <LockKeyhole />
                <div>
                  <strong>Competição com privacidade</strong>
                  <p>O ranking mostra apenas primeiro nome e inicial do sobrenome.</p>
                </div>
              </section>
            </aside>
          </div>

          <section className="league-achievements">
            <header>
              <div>
                <span className="dashboard-eyebrow">Conquistas</span>
                <h2>Seu mural Shift</h2>
              </div>
              <Award />
            </header>
            <div>
              {leagueAchievements.map((achievement) => (
                <article className={achievement.unlocked ? "unlocked" : "locked"} key={achievement.id}>
                  <div>{achievement.unlocked ? <Medal /> : <LockKeyhole />}</div>
                  <span>{achievement.unlocked ? "Conquistado" : "Em progresso"}</span>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  {!achievement.unlocked && (
                    <>
                      <div className="achievement-track">
                        <i style={{ width: `${(achievement.progress / achievement.target) * 100}%` }} />
                      </div>
                      <small>{achievement.progress}/{achievement.target}</small>
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="league-history">
          <Trophy />
          <div>
            <span className="dashboard-eyebrow">Seu histórico</span>
            <h2>6 meses de constância</h2>
            <p>Você já acumulou 67 check-ins e terminou três meses no Top 10.</p>
          </div>
          <div className="history-months">
            {[
              ["Jan", "9", "#12"],
              ["Fev", "10", "#9"],
              ["Mar", "12", "#7"],
              ["Abr", "13", "#6"],
              ["Mai", "12", "#8"],
              ["Jun", "11", "#5"],
            ].map(([month, checkins, position]) => (
              <article key={month}>
                <span>{month}</span>
                <strong>{checkins}</strong>
                <small>{position}</small>
              </article>
            ))}
          </div>
          <Link className="dash-button primary" href="/aluno/check-in">
            Próximo check-in <ChevronRight />
          </Link>
        </section>
      )}
    </div>
  );
}
