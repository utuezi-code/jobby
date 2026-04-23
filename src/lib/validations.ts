import { z } from 'zod'

export const leadSchema = z.object({
  prenom: z
    .string()
    .min(2, 'Le prénom doit avoir au moins 2 caractères')
    .max(50, 'Prénom trop long'),
  nom: z
    .string()
    .min(2, 'Le nom doit avoir au moins 2 caractères')
    .max(50, 'Nom trop long'),
  email: z.string().email("L'adresse email est invalide"),
  telephone: z
    .string()
    .min(8, 'Numéro de téléphone invalide')
    .max(20, 'Numéro de téléphone trop long'),
  structure: z.string().max(100).optional().default(''),
  fonction: z.string().max(100).optional().default(''),
  profil: z.enum(
    [
      'etudiant',
      'professionnel',
      'entrepreneur',
      'formateur',
      'partenaire',
      'institution',
      'entreprise',
      'autre',
    ],
    { message: 'Veuillez sélectionner un profil' },
  ),
  interests: z
    .array(z.string())
    .min(1, "Sélectionnez au moins un centre d'intérêt"),
  message: z.string().max(500, 'Message trop long (500 caractères max)').optional().default(''),
  consent: z.literal(true, 'Vous devez accepter pour continuer'),
  quiz_session_token: z.string().optional(),
})

export type LeadSchema = z.infer<typeof leadSchema>

export const quizSubmitSchema = z.object({
  score: z.number().int().min(0).max(10),
  total_questions: z.number().int().default(5),
  answers: z.array(
    z.object({
      question_id: z.number(),
      answer: z.enum(['mythe', 'realite']),
      correct: z.boolean(),
    }),
  ),
  session_token: z.string().optional(),
  lead_id: z.string().uuid().optional(),
})

export type QuizSubmitSchema = z.infer<typeof quizSubmitSchema>

export const adminNoteSchema = z.object({
  note: z.string().min(1, 'La note ne peut pas être vide').max(1000),
})

export const leadStatusSchema = z.object({
  status: z.enum([
    'nouveau',
    'a_relancer',
    'relance',
    'partenaire_potentiel',
    'prioritaire',
  ]),
})
