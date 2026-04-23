export type LeadProfil =
  | 'etudiant'
  | 'professionnel'
  | 'entrepreneur'
  | 'formateur'
  | 'partenaire'
  | 'institution'
  | 'entreprise'
  | 'autre'

export type LeadStatus =
  | 'nouveau'
  | 'a_relancer'
  | 'relance'
  | 'partenaire_potentiel'
  | 'prioritaire'

export type InterestSlug =
  | 'ia'
  | 'cybersecurite'
  | 'data'
  | 'entrepreneuriat'
  | 'innovation'
  | 'formation'
  | 'autre'

export interface Lead {
  id: string
  nom: string
  prenom: string
  telephone: string
  email: string
  structure: string | null
  fonction: string | null
  profil: LeadProfil
  message: string | null
  consent: boolean
  status: LeadStatus
  source: string
  created_at: string
  updated_at: string
  lead_interests?: { interests: Interest }[]
  admin_notes?: AdminNote[]
  quiz_attempts?: QuizAttempt[]
}

export interface Interest {
  id: string
  slug: InterestSlug
  label: string
  sort_order: number
}

export interface QuizAttempt {
  id: string
  lead_id: string | null
  score: number
  total_questions: number
  answers: QuizAnswer[]
  session_token: string | null
  completed: boolean
  created_at: string
}

export interface QuizAnswer {
  question_id: number
  answer: 'mythe' | 'realite'
  correct: boolean
}

export interface AdminNote {
  id: string
  lead_id: string
  note: string
  author_email: string | null
  created_at: string
}

export interface LeadFormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  structure: string
  fonction: string
  profil: string
  interests: string[]
  message: string
  consent: boolean
  quiz_session_token?: string
}

export interface QuizQuestion {
  id: number
  statement: string
  answer: 'mythe' | 'realite'
  explanation: string
}

export const PROFIL_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'Sélectionnez votre profil' },
  { value: 'etudiant', label: 'Étudiant(e)' },
  { value: 'professionnel', label: 'Professionnel(le)' },
  { value: 'entrepreneur', label: 'Entrepreneur(e)' },
  { value: 'formateur', label: 'Formateur / Enseignant' },
  { value: 'partenaire', label: 'Partenaire potentiel' },
  { value: 'institution', label: 'Institution / Organisation' },
  { value: 'entreprise', label: 'Entreprise' },
  { value: 'autre', label: 'Autre' },
]

export const PROFIL_LABELS: Record<string, string> = {
  etudiant: 'Étudiant(e)',
  professionnel: 'Professionnel(le)',
  entrepreneur: 'Entrepreneur(e)',
  formateur: 'Formateur / Enseignant',
  partenaire: 'Partenaire potentiel',
  institution: 'Institution / Organisation',
  entreprise: 'Entreprise',
  autre: 'Autre',
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  nouveau: 'Nouveau',
  a_relancer: 'À relancer',
  relance: 'Relancé',
  partenaire_potentiel: 'Partenaire potentiel',
  prioritaire: 'Prioritaire',
}

export const INTERESTS: Array<{ slug: string; label: string }> = [
  { slug: 'ia', label: 'Intelligence Artificielle' },
  { slug: 'cybersecurite', label: 'Cybersécurité' },
  { slug: 'data', label: 'Data & Analytique' },
  { slug: 'entrepreneuriat', label: 'Entrepreneuriat' },
  { slug: 'innovation', label: 'Innovation' },
  { slug: 'formation', label: 'Formation continue' },
  { slug: 'autre', label: 'Autre' },
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: "L'IA peut remplacer complètement l'intelligence humaine.",
    answer: 'mythe',
    explanation:
      "L'IA est un outil puissant, mais elle ne possède ni conscience, ni émotions, ni créativité réelle. Elle augmente l'humain, sans le remplacer.",
  },
  {
    id: 2,
    statement:
      "Une IA peut analyser des images médicales avec la précision d'un spécialiste.",
    answer: 'realite',
    explanation:
      "Des systèmes d'IA atteignent ou dépassent la précision humaine dans la détection de maladies sur imagerie médicale (cancer, rétinopathie…).",
  },
  {
    id: 3,
    statement:
      "L'IA comprend vraiment le sens profond des mots, comme un être humain.",
    answer: 'mythe',
    explanation:
      "L'IA traite des patterns statistiques. Elle simule la compréhension, mais ne saisit pas le sens culturel ni émotionnel profond.",
  },
  {
    id: 4,
    statement:
      "L'Afrique développe ses propres solutions d'IA adaptées à ses réalités.",
    answer: 'realite',
    explanation:
      "Des startups et laboratoires africains développent des IA pour la santé, l'agriculture, les langues locales et les marchés financiers du continent.",
  },
  {
    id: 5,
    statement:
      "L'IA a toujours besoin de millions de données pour fonctionner.",
    answer: 'mythe',
    explanation:
      "Des techniques comme le few-shot learning permettent à l'IA d'apprendre avec très peu d'exemples, surtout depuis des modèles pré-entraînés.",
  },
]
