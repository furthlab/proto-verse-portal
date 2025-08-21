import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnnotationFeature } from "@/lib/supabase"
import { Database, MapPin, Dna } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchResultsProps {
  results: AnnotationFeature[]
  searchTerm: string
  isLoading: boolean
}

const SearchResults = ({ results, searchTerm, isLoading }: SearchResultsProps) => {
  const [visibleCount, setVisibleCount] = useState(5)

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Searching 207,012 annotations this might take some time...</span>
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

  const resultsByType = results.reduce((acc, result) => {
    const type = "genes"
    if (!acc[type]) acc[type] = []
    acc[type].push(result)
    return acc
  }, {} as Record<string, AnnotationFeature[]>)

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Search Results for "{searchTerm}"
        </h3>
        <p className="text-muted-foreground">
          Found {results.length} annotation{results.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(resultsByType).map(([type, features]) => (
          <Card key={type} className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">Annotations</CardTitle>
                <Badge variant="secondary" className="ml-auto">
                  {features.length} feature{features.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {features.slice(0, visibleCount).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                      <div className="flex items-center space-x-2">
  <Badge variant="outline" className="text-base px-2 py-1 font-semibold">
    {feature.symbol.split(" ")[0]}
  </Badge>
  <span className="text-sm font-medium">
    {feature.description}
  </span>
</div>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 max-w-md list-disc list-inside">
                          <li>
                            <strong>GO biological process:</strong>{" "}
                            <span className="block truncate">{feature.GO_bio}</span>
                          </li>
                          <li>
                            <strong>GO cellular compartment:</strong>{" "}
                            <span className="block truncate">{feature.GO_cell}</span>
                          </li>
                          <li>
                            <strong>GO molecular function:</strong>{" "}
                            <span className="block truncate">{feature.GO_mol}</span>
                          </li>
                        </ul>
                        <p className="text-sm mt-1 truncate max-w-md">
                          {feature.protein_identifier && `Gene: ${feature.protein_identifier} | `}
                          ID: {feature.ensembl_id}
                        </p>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < features.length && (
                <div className="flex items-center justify-center mt-4 space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                  >
                    Show More
                  </Button>
                  <Badge variant="secondary">
                    {features.length} total
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
