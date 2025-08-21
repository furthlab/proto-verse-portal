import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xlogukihgqsjtdqytgvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb2d1a2loZ3FzanRkcXl0Z3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjA3ODYsImV4cCI6MjA3MDk5Njc4Nn0.dVbJcUOzu5xl1m8HUoTTjEa3LwxtL1TEhhnjnxmVw0c'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface AnnotationFeature {
  entry_id: number;
  gene_id?: string;
  gene_symbol?: string;
  name?: string;
  id?: string; // GO ID
  [key: string]: any; // extra fields
}