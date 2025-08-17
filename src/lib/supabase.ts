import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export type AnnotationFeature = {
  id?: number
  genome: string
  start: number
  end: number
  strand: string
  type: string
  attributes: string
}