"use client";

import { CheckCircle2, Mic, Pause, Send, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import {
  questionsForRole,
  type WikiRespondentRole,
} from "@/lib/wiki";

type Recording = {
  blob: Blob;
  url: string;
  fileName?: string;
};

export function WikiInterviewForm({ token }: { token?: string }) {
  const [role, setRole] = useState<WikiRespondentRole>("owner");
  const [recordings, setRecordings] = useState<Record<string, Recording>>({});
  const [recordingId, setRecordingId] = useState<string>();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const questions = questionsForRole(role);

  async function startRecording(questionId: string) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        setRecordings((current) => ({
          ...current,
          [questionId]: { blob, url: URL.createObjectURL(blob) },
        }));
        stream.getTracks().forEach((track) => track.stop());
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecordingId(questionId);
    } catch {
      setError("Não foi possível acessar o microfone. Autorize o acesso ou responda por texto.");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecordingId(undefined);
  }

  function uploadAudio(questionId: string, file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      setError("Envie um arquivo de áudio (mp3, m4a, ogg, opus ou wav).");
      return;
    }
    setError(undefined);
    setRecordings((current) => ({
      ...current,
      [questionId]: {
        blob: file,
        url: URL.createObjectURL(file),
        fileName: file.name,
      },
    }));
  }

  function removeRecording(questionId: string) {
    setRecordings((current) => {
      const next = { ...current };
      URL.revokeObjectURL(next[questionId].url);
      delete next[questionId];
      return next;
    });
  }

  async function submit(formData: FormData) {
    setSending(true);
    setError(undefined);
    formData.set("role", role);
    if (token) formData.set("token", token);
    Object.entries(recordings).forEach(([questionId, recording]) => {
      formData.set(
        `audio:${questionId}`,
        recording.blob,
        recording.fileName ?? `${questionId}.webm`,
      );
    });

    const response = await fetch("/api/wiki/interviews", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as { error?: string };
    setSending(false);

    if (!response.ok) {
      setError(result.error ?? "Não foi possível enviar as respostas.");
      return;
    }
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (sent) {
    return (
      <section className="wiki-interview-success">
        <CheckCircle2 />
        <span>Entrevista recebida</span>
        <h1>Obrigado por ensinar como a Shift pensa.</h1>
        <p>
          As respostas serão organizadas e revisadas antes de entrarem na base
          do agente. Nada será publicado automaticamente.
        </p>
      </section>
    );
  }

  return (
    <form className="wiki-interview-form" action={submit}>
      <section className="wiki-intro-card">
        <span>Wiki LLM Shift</span>
        <h1>Vamos ensinar o agente a responder como a Shift.</h1>
        <p>
          Responda com naturalidade. Em cada pergunta você pode marcar as
          caixas, escrever, gravar um áudio na hora ou subir um áudio pronto —
          e combinar os formatos. Tempo estimado: 25 a 35 minutos.
        </p>
      </section>

      <section className="wiki-identity-card">
        <label>
          Seu nome
          <input name="respondentName" required placeholder="Nome completo" />
        </label>
        <label>
          Seu cargo
          <input name="respondentTitle" required placeholder="Ex.: Sócio fundador" />
        </label>
        <fieldset>
          <legend>Qual é o seu papel nesta entrevista?</legend>
          <div className="wiki-role-options">
            <label className={role === "owner" ? "selected" : ""}>
              <input
                checked={role === "owner"}
                name="roleChoice"
                onChange={() => setRole("owner")}
                type="radio"
              />
              <strong>Dono</strong>
              <span>Visão, posicionamento e decisões finais.</span>
            </label>
            <label className={role === "leader" ? "selected" : ""}>
              <input
                checked={role === "leader"}
                name="roleChoice"
                onChange={() => setRole("leader")}
                type="radio"
              />
              <strong>Líder</strong>
              <span>Rotina, regras e situações reais.</span>
            </label>
          </div>
        </fieldset>
      </section>

      <div className="wiki-question-list">
        {questions.map((question, index) => {
          const recording = recordings[question.id];
          const isRecording = recordingId === question.id;
          return (
            <section className="wiki-question-card" key={question.id}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{question.category}</small>
              </header>
              <h2>{question.prompt}</h2>
              {question.help && <p className="wiki-question-help">{question.help}</p>}
              {question.options && (
                <div className="wiki-option-grid">
                  {question.options.map((option) => (
                    <label className="wiki-option" key={option}>
                      <input
                        name={`option:${question.id}`}
                        type="checkbox"
                        value={option}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              <textarea
                name={`answer:${question.id}`}
                placeholder={
                  question.options
                    ? "Complete aqui o que as caixas acima não cobrem..."
                    : "Escreva do jeito que você explicaria para alguém da equipe..."
                }
                rows={6}
              />
              <div className="wiki-audio-row">
                {!isRecording && !recording && (
                  <>
                    <button type="button" onClick={() => startRecording(question.id)}>
                      <Mic /> {question.audioSuggested ? "Responder por áudio" : "Gravar áudio"}
                    </button>
                    <label className="wiki-upload-audio">
                      <Upload /> Subir áudio
                      <input
                        accept="audio/*"
                        onChange={(event) => {
                          uploadAudio(question.id, event.target.files?.[0]);
                          event.target.value = "";
                        }}
                        type="file"
                      />
                    </label>
                  </>
                )}
                {isRecording && (
                  <button className="recording" type="button" onClick={stopRecording}>
                    <Pause /> Parar gravação
                  </button>
                )}
                {recording && (
                  <>
                    <audio controls src={recording.url} />
                    <button
                      className="remove-audio"
                      type="button"
                      onClick={() => removeRecording(question.id)}
                      aria-label="Excluir áudio"
                    >
                      <Trash2 />
                    </button>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <label className="wiki-consent">
        <input name="consent" required type="checkbox" />
        Autorizo o uso interno destas respostas e gravações para construir,
        testar e manter o agente de atendimento da Shift.
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="wiki-submit" disabled={sending || Boolean(recordingId)} type="submit">
        <Send /> {sending ? "Enviando..." : "Enviar entrevista"}
      </button>
    </form>
  );
}
