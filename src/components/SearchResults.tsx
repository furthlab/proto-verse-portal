import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnnotationFeature } from "@/lib/supabase"
import { Database, MapPin, Dna } from "lucide-react"

interface SearchResultsProps {
  results: AnnotationFeature[]
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
              <span className="text-muted-foreground">Searching annotations...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!searchTerm) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card className="border-muted">
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
            <p className="text-muted-foreground">
              No annotations found for "{searchTerm}". Try searching for gene names, types, or other annotations.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Group results by genome
  const resultsByGenome = results.reduce((acc, result) => {
    if (!acc[result.genome]) {
      acc[result.genome] = []
    }
    acc[result.genome].push(result)
    return acc
  }, {} as Record<string, AnnotationFeature[]>)

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Search Results for "{searchTerm}"
        </h3>
        <p className="text-muted-foreground">
          Found {results.length} annotation{results.length !== 1 ? 's' : ''} across {Object.keys(resultsByGenome).length} genome{Object.keys(resultsByGenome).length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(resultsByGenome).map(([genome, features]) => (
          <Card key={genome} className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">{genome}</CardTitle>
                <Badge variant="secondary" className="ml-auto">
                  {features.length} feature{features.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {features.slice(0, 5).map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {feature.type}
                          </Badge>
                          <span className="text-sm font-medium">
                            {feature.start.toLocaleString()} - {feature.end.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({feature.strand})
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 truncate max-w-md">
                          {feature.attributes}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {features.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    ... and {features.length - 5} more features
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