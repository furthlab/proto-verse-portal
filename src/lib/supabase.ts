import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xwhqazvwkscegtmlgqcv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHFhenZ3a3NjZWd0bWxncWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NDMwNDcsImV4cCI6MjA4NjQxOTA0N30.Bg0gRIDGw2au0612U4UQp0bga8bWUUY_G8o2HmJmr7A'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type AnnotationFeature = {
  gene_id: number
  organism_id: number
  symbol: string
  gene_identifier: string
  description: string
  protein_identifier: string
  ensembl_id: string
  GO_bio: string
  GO_cell: string
  GO_mol: string
  organism_name: string
}