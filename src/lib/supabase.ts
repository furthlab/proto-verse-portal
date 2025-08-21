import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xlogukihgqsjtdqytgvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb2d1a2loZ3FzanRkcXl0Z3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjA3ODYsImV4cCI6MjA3MDk5Njc4Nn0.dVbJcUOzu5xl1m8HUoTTjEa3LwxtL1TEhhnjnxmVw0c'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Gene = {
  gene_id: number
  organism_id: number
  symbol: string
  gene_identifier: string
  description: string | null
  protein_identifier: string | null
  ensembl_id: string | null
  GO_bio: string | null
  GO_cell: string | null
  GO_mol: string | null
}

export type Organism = {
  organism_id: number
  name: string
  short_name: string
}

export type Ortholog = {
  ortholog_id: number
  gene_id: number
  ortholog_gene_id: number
}

export type GeneWithOrthologs = Gene & {
  organism: Organism
  orthologs: Gene[]
}
