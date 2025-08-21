import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GeneWithOrthologs } from "@/lib/supabase"
import { Database, MapPin, Dna } from "lucide-react"

interface SearchResultsProps {
  results: GeneWithOrthologs[]
  searchTerm: string
  isLoading: boolean
}

const SearchResults = ({ results, searchTerm, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Searching genes...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!searchTerm) return null

  if (results.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card className="border-muted">
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
            <p className="text-muted-foreground">
              No genes found for "{searchTerm}". Try searching by gene symbol, description, or organism.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Search Results for "{searchTerm}"
        </h3>
        <p className="text-muted-foreground">
          Found {results.length} gene{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {results.map((gene) => (
          <Card key={gene.gene_id} className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">{gene.symbol}</CardTitle>
                <Badge variant="secondary" className="ml-auto">
                  {gene.orthologs.length} ortholog{gene.orthologs.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Organism: {gene.organism.name} ({gene.organism.short_name})<br />
                ID: {gene.gene_identifier} | Protein: {gene.protein_identifier || 'N/A'}
              </div>
              <div className="grid gap-3">
                {gene.orthologs.map((ortho) => (
                  <div key={ortho.gene_id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {ortho.symbol}
                          </Badge>
                          <span className="text-sm font-medium">{ortho.gene_identifier}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 truncate max-w-md">
                          {ortho.description || 'No description available'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {gene.orthologs.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    ... and {gene.orthologs.length - 5} more orthologs
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
