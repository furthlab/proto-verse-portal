import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xlogukihgqsjtdqytgvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb2d1a2loZ3FzanRkcXl0Z3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjA3ODYsImV4cCI6MjA3MDk5Njc4Nn0.dVbJcUOzu5xl1m8HUoTTjEa3LwxtL1TEhhnjnxmVw0c'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Organism {
  organism_id: number;
  name: string;
  short_name: string;
}

export interface Gene {
  gene_id: number;
  organism_id: number;
  symbol: string;
  gene_identifier: string;
  description: string;
  protein_identifier: string;
  ensembl_id: string;
  GO_bio: string;
  GO_cell: string;
  GO_mol: string;
  ORGANISMS?: Organism; // joined relation
}

export interface Ortholog {
  ortholog_id: number;
  gene_id: number;
  ortholog_gene_id: number;
}

export interface GeneWithOrthologs extends Gene {
  orthologs?: Gene[]; // expanded orthologs
}