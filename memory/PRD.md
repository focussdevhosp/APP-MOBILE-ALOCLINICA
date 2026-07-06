# Alô Clínica - PRD

## Overview
**Alô Clínica** is a complete Brazilian Portuguese telemedicine platform featuring the mascot **Pingo** (a friendly blue penguin doctor). It includes two mobile apps in one bundle: **Patient App** and **Doctor App**, selectable from the landing screen.

## New in v1.1
- Animated **Splash Screen** (bounce, fade, pulsing dots) with Pingo waving
- **Onboarding** carousel (3 slides) with different Pingo variations
- **AI-generated Pingo variants**: logo, waving, thumbs_up, clipboard, sleeping, sad, heart, celebrating (generated via Gemini Nano Banana + Emergent LLM key)
- **Promo banner** on patient home featuring "Pingo celebrating" variant
- App icon + adaptive icon + splash updated to Pingo
- Empty states with expressive Pingo (sad variant for empty appointments, etc.)

## Product Type
Mobile App (Expo / React Native) — Frontend-only with mock data (no backend required for demo).

## Key Screens

### Shared
- `/` — Role selection (Patient / Doctor) with Pingo mascot & gradient hero
- `/login` — Login with role-based routing (Google/Apple social buttons)
- `/register` — Registration with role-specific fields (CPF or CRM)

### Patient App (`(patient)` tab group)
- **Home** — Greeting, search, next appointment card, quick actions, specialties row, top doctors, Pingo CTA
- **Consultas** — Upcoming & History tabs, appointment cards with actions
- **Prontuário** — Health data, allergies, menu to Receitas/Exames/Consultas/Vacinas
- **Pingo AI** — Chat interface with mascot avatar, suggestion chips, canned answers
- **Perfil** — Account, preferences, support, logout
- Detail screens: Search doctors (chip filter), Doctor profile (hero + sticky CTA), Booking (day/time/type + success), Video Consultation (full-screen PIP), Prescriptions, Exams, Pharmacy

### Doctor App (`(doctor)` tab group)
- **Home** — Today's summary card, quick actions, waiting queue with "Iniciar" button, Pingo insights
- **Agenda** — Week view + timeline with status pills
- **Pacientes** — Search + patient list with conditions
- **Ganhos** — Balance card, stats, 7-day bar chart, transactions
- **Perfil** — Professional settings, banking, logout
- Detail screens: Patient record (Histórico/Receitas/Exames tabs), Doctor consultation (with notes panel), Prescription writer (multi-med form + digital signature success)

## Design System
- Personality: iOS-Native Clean (per `design_guidelines.json`)
- Colors: Blue (#007AFF) + Orange (#FF9500) matching Pingo mascot
- Icons: Ionicons (@expo/vector-icons)
- Language: Portuguese-BR
- Mascot: Used in role select, chat, empty states, insights

## Tech Stack
- Expo Router (file-based routing with 2 tab groups)
- expo-image, expo-linear-gradient, react-native-safe-area-context
- Mock data in `/app/frontend/src/mockData.ts`

## Demo Flow
1. Open → Choose "Sou Paciente" → Login (pre-filled) → Patient Home
2. Explore tabs: Consultas, Prontuário, Pingo AI, Perfil
3. Tap search → filter specialty → open doctor → Book → Confirm
4. Logout → Choose "Sou Médico(a)" → Login → Doctor Home
5. Explore Agenda, Pacientes (open record), Ganhos, Perfil

## Notes
- No backend integrations, no auth persistence — MOCKED with hardcoded users
- No real video/WebRTC — the consultation screen shows a static image with PIP overlay + controls
- Pingo AI replies are randomly selected from canned answers (no real LLM)
