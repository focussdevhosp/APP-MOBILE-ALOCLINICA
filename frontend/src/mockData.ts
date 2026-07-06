export type Specialty = { id: string; name: string; icon: string; color: string };

export const SPECIALTIES: Specialty[] = [
  { id: "cardio", name: "Cardiologia", icon: "heart", color: "#FF3B30" },
  { id: "pedia", name: "Pediatria", icon: "happy", color: "#FF9500" },
  { id: "psiqu", name: "Psiquiatria", icon: "medkit", color: "#5AC8FA" },
  { id: "derma", name: "Dermatologia", icon: "flower", color: "#AF52DE" },
  { id: "ortop", name: "Ortopedia", icon: "body", color: "#34C759" },
  { id: "clini", name: "Clínico Geral", icon: "medical", color: "#007AFF" },
  { id: "ginec", name: "Ginecologia", icon: "female", color: "#FF2D55" },
  { id: "oftal", name: "Oftalmologia", icon: "eye", color: "#FFCC00" },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
  rating: number;
  reviews: number;
  price: number;
  yearsExp: number;
  crm: string;
  bio: string;
  photo: string;
  online: boolean;
  nextAvailable: string;
};

export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dra. Ana Ribeiro",
    specialty: "Cardiologia",
    specialtyId: "cardio",
    rating: 4.9,
    reviews: 328,
    price: 180,
    yearsExp: 12,
    crm: "CRM/SP 123456",
    bio: "Especialista em cardiologia clínica com foco em prevenção de doenças cardiovasculares. Atende adultos e idosos.",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop",
    online: true,
    nextAvailable: "Hoje, 14:30",
  },
  {
    id: "d2",
    name: "Dr. Carlos Mendes",
    specialty: "Pediatria",
    specialtyId: "pedia",
    rating: 4.8,
    reviews: 214,
    price: 150,
    yearsExp: 8,
    crm: "CRM/RJ 654321",
    bio: "Pediatra dedicado ao acompanhamento do desenvolvimento infantil, do recém-nascido ao adolescente.",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop",
    online: true,
    nextAvailable: "Hoje, 16:00",
  },
  {
    id: "d3",
    name: "Dra. Beatriz Souza",
    specialty: "Psiquiatria",
    specialtyId: "psiqu",
    rating: 5.0,
    reviews: 402,
    price: 250,
    yearsExp: 15,
    crm: "CRM/MG 789012",
    bio: "Psiquiatra com abordagem humanizada. Especialista em ansiedade, depressão e transtornos do humor.",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop",
    online: false,
    nextAvailable: "Amanhã, 09:00",
  },
  {
    id: "d4",
    name: "Dr. Rafael Lima",
    specialty: "Dermatologia",
    specialtyId: "derma",
    rating: 4.7,
    reviews: 178,
    price: 200,
    yearsExp: 10,
    crm: "CRM/SP 345678",
    bio: "Dermatologia clínica e estética. Tratamento de acne, dermatites e cuidados com a pele.",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop",
    online: true,
    nextAvailable: "Hoje, 18:00",
  },
  {
    id: "d5",
    name: "Dra. Juliana Alves",
    specialty: "Clínico Geral",
    specialtyId: "clini",
    rating: 4.9,
    reviews: 512,
    price: 120,
    yearsExp: 7,
    crm: "CRM/SP 987654",
    bio: "Clínica geral com foco em atendimento humanizado e preventivo para toda família.",
    photo: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop",
    online: true,
    nextAvailable: "Agora",
  },
  {
    id: "d6",
    name: "Dr. Felipe Santos",
    specialty: "Ortopedia",
    specialtyId: "ortop",
    rating: 4.6,
    reviews: 132,
    price: 220,
    yearsExp: 11,
    crm: "CRM/BA 111222",
    bio: "Ortopedista especializado em joelho e coluna. Avaliação e tratamento de lesões esportivas.",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop",
    online: false,
    nextAvailable: "Sexta, 10:30",
  },
];

export type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  photo: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  type: "video" | "presencial";
};

export const APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    doctorId: "d1",
    doctorName: "Dra. Ana Ribeiro",
    specialty: "Cardiologia",
    photo: DOCTORS[0].photo,
    date: "Hoje",
    time: "14:30",
    status: "confirmed",
    type: "video",
  },
  {
    id: "a2",
    doctorId: "d5",
    doctorName: "Dra. Juliana Alves",
    specialty: "Clínico Geral",
    photo: DOCTORS[4].photo,
    date: "Amanhã",
    time: "10:00",
    status: "confirmed",
    type: "video",
  },
  {
    id: "a3",
    doctorId: "d3",
    doctorName: "Dra. Beatriz Souza",
    specialty: "Psiquiatria",
    photo: DOCTORS[2].photo,
    date: "12 Mai",
    time: "16:00",
    status: "completed",
    type: "video",
  },
  {
    id: "a4",
    doctorId: "d2",
    doctorName: "Dr. Carlos Mendes",
    specialty: "Pediatria",
    photo: DOCTORS[1].photo,
    date: "05 Mai",
    time: "09:30",
    status: "completed",
    type: "presencial",
  },
];

export type Prescription = {
  id: string;
  doctor: string;
  date: string;
  medications: { name: string; dose: string; frequency: string; duration: string }[];
};

export const PRESCRIPTIONS: Prescription[] = [
  {
    id: "p1",
    doctor: "Dra. Ana Ribeiro",
    date: "12 Mai 2026",
    medications: [
      { name: "Losartana", dose: "50mg", frequency: "1x ao dia", duration: "Uso contínuo" },
      { name: "AAS", dose: "100mg", frequency: "1x ao dia após almoço", duration: "30 dias" },
    ],
  },
  {
    id: "p2",
    doctor: "Dra. Beatriz Souza",
    date: "05 Mai 2026",
    medications: [
      { name: "Escitalopram", dose: "10mg", frequency: "1x ao dia pela manhã", duration: "60 dias" },
    ],
  },
];

export type Exam = {
  id: string;
  name: string;
  date: string;
  status: "pendente" | "coletado" | "disponivel";
  requestedBy: string;
};

export const EXAMS: Exam[] = [
  { id: "e1", name: "Hemograma Completo", date: "15 Mai 2026", status: "disponivel", requestedBy: "Dra. Juliana Alves" },
  { id: "e2", name: "Glicemia em Jejum", date: "15 Mai 2026", status: "disponivel", requestedBy: "Dra. Juliana Alves" },
  { id: "e3", name: "Colesterol Total e Frações", date: "20 Mai 2026", status: "pendente", requestedBy: "Dra. Ana Ribeiro" },
  { id: "e4", name: "Eletrocardiograma", date: "22 Mai 2026", status: "coletado", requestedBy: "Dra. Ana Ribeiro" },
];

// Doctor app data
export type PatientRecord = {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo: string;
  lastVisit: string;
  condition: string;
  phone: string;
  history: { date: string; note: string; type: string }[];
};

export const PATIENTS: PatientRecord[] = [
  {
    id: "pt1",
    name: "Maria Silva",
    age: 34,
    gender: "F",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
    lastVisit: "12 Mai 2026",
    condition: "Hipertensão",
    phone: "(11) 98765-4321",
    history: [
      { date: "12 Mai 2026", note: "PA 140/90. Ajustado losartana para 50mg.", type: "consulta" },
      { date: "05 Abr 2026", note: "Retorno. Paciente refere melhora dos sintomas.", type: "consulta" },
      { date: "10 Mar 2026", note: "Solicitados exames de rotina.", type: "exame" },
    ],
  },
  {
    id: "pt2",
    name: "João Pedro",
    age: 8,
    gender: "M",
    photo: "https://images.unsplash.com/photo-1595347097560-69238724e7bd?w=400&auto=format&fit=crop",
    lastVisit: "10 Mai 2026",
    condition: "Rinite alérgica",
    phone: "(11) 99887-6655",
    history: [
      { date: "10 Mai 2026", note: "Crise alérgica. Prescrito antihistamínico.", type: "consulta" },
    ],
  },
  {
    id: "pt3",
    name: "Ricardo Almeida",
    age: 45,
    gender: "M",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
    lastVisit: "08 Mai 2026",
    condition: "Ansiedade",
    phone: "(21) 98123-4567",
    history: [
      { date: "08 Mai 2026", note: "Paciente relatou melhora após ajuste medicamentoso.", type: "consulta" },
    ],
  },
  {
    id: "pt4",
    name: "Fernanda Costa",
    age: 28,
    gender: "F",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
    lastVisit: "05 Mai 2026",
    condition: "Check-up",
    phone: "(11) 97654-3210",
    history: [
      { date: "05 Mai 2026", note: "Consulta de rotina, exames solicitados.", type: "consulta" },
    ],
  },
];

export type DoctorAgenda = {
  id: string;
  time: string;
  patient: string;
  patientId: string;
  photo: string;
  reason: string;
  status: "aguardando" | "em_andamento" | "concluida";
};

export const TODAY_AGENDA: DoctorAgenda[] = [
  {
    id: "ag1",
    time: "09:00",
    patient: "Maria Silva",
    patientId: "pt1",
    photo: PATIENTS[0].photo,
    reason: "Retorno - Hipertensão",
    status: "concluida",
  },
  {
    id: "ag2",
    time: "10:30",
    patient: "João Pedro",
    patientId: "pt2",
    photo: PATIENTS[1].photo,
    reason: "Consulta pediátrica",
    status: "em_andamento",
  },
  {
    id: "ag3",
    time: "14:00",
    patient: "Ricardo Almeida",
    patientId: "pt3",
    photo: PATIENTS[2].photo,
    reason: "Acompanhamento",
    status: "aguardando",
  },
  {
    id: "ag4",
    time: "15:30",
    patient: "Fernanda Costa",
    patientId: "pt4",
    photo: PATIENTS[3].photo,
    reason: "Primeira consulta",
    status: "aguardando",
  },
  {
    id: "ag5",
    time: "17:00",
    patient: "Lucas Ferreira",
    patientId: "pt5",
    photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop",
    reason: "Videochamada",
    status: "aguardando",
  },
];

export const DOCTOR_ME = {
  name: "Dra. Ana Ribeiro",
  specialty: "Cardiologia",
  crm: "CRM/SP 123456",
  photo: DOCTORS[0].photo,
  email: "ana.ribeiro@aloclinica.com",
  totalPatients: 428,
  rating: 4.9,
  totalConsults: 1234,
};

export const PATIENT_ME = {
  name: "Camila Souza",
  photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop",
  email: "camila.souza@email.com",
  phone: "(11) 99999-8888",
  birthdate: "12/08/1995",
  cpf: "***.***.***-99",
  bloodType: "O+",
  allergies: ["Dipirona", "Poeira"],
  chronicConditions: [],
  height: "165 cm",
  weight: "62 kg",
};

export type PingoMessage = {
  id: string;
  sender: "pingo" | "user";
  text: string;
  time: string;
};

export const PINGO_INITIAL_MESSAGES: PingoMessage[] = [
  {
    id: "m1",
    sender: "pingo",
    text: "Olá! Eu sou o Pingo, seu assistente de saúde 🐧 Como posso te ajudar hoje?",
    time: "agora",
  },
];

export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];

export const EARNINGS = {
  today: 890,
  week: 4520,
  month: 18340,
  pending: 1200,
  history: [
    { id: "eh1", patient: "Maria Silva", date: "12 Mai", amount: 180, status: "pago" },
    { id: "eh2", patient: "Ricardo Almeida", date: "12 Mai", amount: 250, status: "pago" },
    { id: "eh3", patient: "Fernanda Costa", date: "11 Mai", amount: 180, status: "pago" },
    { id: "eh4", patient: "João Pedro", date: "10 Mai", amount: 150, status: "pendente" },
    { id: "eh5", patient: "Lucas Ferreira", date: "10 Mai", amount: 180, status: "pago" },
  ],
};
