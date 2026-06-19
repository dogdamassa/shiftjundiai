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

export const publicProfessionals: PublicProfessional[] = [
  {
    id: "rafael",
    name: "Rafael Mendes",
    role: "Head Coach",
    specialties: ["Força", "Hipertrofia", "Performance"],
    modalities: ["Treino personalizado", "Shift Move"],
    bio: "Transforma avaliação e objetivo em um treino preciso, progressivo e sustentável. Lidera o método de força da Shift.",
    image: "/images/shift-coaching.jpeg",
    imagePosition: "center 30%",
    instagram: "@rafael.shift",
  },
  {
    id: "paula",
    name: "Paula Torres",
    role: "Coach",
    specialties: ["Bike", "Condicionamento", "Mobilidade"],
    modalities: ["Treino personalizado", "Shift Flow"],
    bio: "Combina energia e leitura técnica para criar sessões intensas, acolhedoras e ajustadas ao ritmo de cada aluno.",
    image: "/images/shift-performance.jpeg",
    imagePosition: "center 35%",
    instagram: "@paula.shift",
  },
  {
    id: "camila",
    name: "Camila Nunes",
    role: "Recovery Specialist",
    specialties: ["Recovery", "Mobilidade", "Regeneração"],
    modalities: ["Recovery"],
    bio: "Cuida da recuperação como parte do processo de performance, conectando mobilidade, descanso e prontidão para o próximo treino.",
    image: "/images/shift-detail.jpeg",
    imagePosition: "center",
  },
  {
    id: "lucas",
    name: "Lucas Prado",
    role: "Fisioterapeuta",
    specialties: ["Prevenção", "Reabilitação", "Movimento"],
    modalities: ["Fisioterapia"],
    bio: "Avalia padrões de movimento e conduz intervenções para que o aluno evolua com segurança e confiança.",
    image: "/images/shift-experience.jpeg",
    imagePosition: "center 30%",
  },
];
