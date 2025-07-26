import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ReadingSession = {
  id: string
  user_id: string
  started_at: string
  ended_at: string | null
  words_read: number
  avg_wpm: number
  text_content: string
  completed: boolean
}

export type QuizResult = {
  id: string
  session_id: string
  user_id: string
  score: number
  max_score: number
  completed_at: string
} 