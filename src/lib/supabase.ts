import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xwhqazvwkscegtmlgqcv.supabase.co'
const supabaseKey = 'sb_publishable_3MKSwggPOdYHnGAJDswxLA_w2cuHt-f'

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