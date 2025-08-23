import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnnotationFeature } from "@/lib/supabase"
import { Database, MapPin, Dna } from "lucide-react"
import { Button } from "@/components/ui/button"
import TranscriptSVG from "@/components/TranscriptRender"


interface SearchResultsProps {
  results: AnnotationFeature[]
  searchTerm: string
  isLoading: boolean
  onOrthologSearch: (geneId: number) => void
}

// Define emoji mapping
const organismEmojis: { [key: number]: string } = {
  1: "🍄 ",  // Physarum polycephalum
  2: "🐌 ",  // Aplysia californica
  3: "🪼 ",  // Mnemiopsis leidyi
  4: "🐭 ",  // Mus musculus
  5: "🔬 ",  // Paramecium tetraurelia
  6: "🪰 ",  // Drosophila melanogaster
  7: "🪱 ",  // Caenorhabditis elegans
  8: "🍄 ",  // Saccharomyces cerevisiae
  9: "👤 ",  // Homo sapiens
  10: "🔬 ", // Stentor coeruleus
  11: "🌊 ", // Hydra vulgaris
  12: "🔬 "  // Paramecium caudatum
}

const extractAccession = (geneIdentifier: string): string | null => {
  // geneIdentifier looks like: "tr|A0BCN5|A0BCN5_PARTE"
  const parts = geneIdentifier.split("|")
  return parts.length > 1 ? parts[1] : null
}

const fetchCoordinates = async (accession: string) => {
  try {
    const response = await fetch(
      `https://www.ebi.ac.uk/proteins/api/coordinates/${accession}?format=json`
    )

    if (!response.ok) return null

    const data = await response.json()
    if (!data?.gnCoordinate?.length) return null

    const loc = data.gnCoordinate[0].genomicLocation
    return {
      chromosome: loc.chromosome,
      start: loc.start,
      end: loc.end,
      reverseStrand: loc.reverseStrand
    }
  } catch (err) {
    console.error("Error fetching coordinates", err)
    return null
  }
}

const SearchResults = ({ results, searchTerm, isLoading, onOrthologSearch }: SearchResultsProps) => {
  const [visibleCount, setVisibleCount] = useState(5)
  const [coords, setCoords] = useState<Record<string, string>>({})

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">
                Searching 207,012 annotations this might take some time...
              </span>
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
                {features.slice(0, visibleCount).map((feature, index) => {
                  const accession = feature.gene_identifier 
                    ? extractAccession(feature.gene_identifier) 
                    : null

                  if (accession && !coords[feature.gene_identifier]) {
                    fetchCoordinates(accession).then((location) => {
                      if (location) {
                        const strand = location.reverseStrand ? " (-)" : " (+)"
                        setCoords((prev) => ({
                          ...prev,
                          [feature.gene_identifier]:
                            `Chr:${location.chromosome}:${location.start}–${location.end}${strand}`
                        }))
                      } else {
                        setCoords((prev) => ({
                          ...prev,
                          [feature.gene_identifier]: "Unavailable"
                        }))
                      }
                    })
                  }

                  return (
                    <div
                      key={index}
                      className="flex flex-col p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-base px-2 py-1 font-semibold">
                              {organismEmojis[feature.organism_id]}
                            </Badge>
                            <Badge variant="outline" className="text-base px-2 py-1 font-semibold">
                              {feature.symbol.split(" ")[0]}
                            </Badge>
                            <span className="text-sm font-medium">{feature.description}</span>
                          </div>
                          <p className="text-sm mt-1 truncate max-w-md">
                            <strong><i>{feature.organism_name}</i></strong>
                          </p>

                          {/* GO terms list */}
                          <ul className="mt-2 space-y-1 text-sm text-muted-foreground max-w-md">
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

                          <TranscriptSVG transcriptId={feature.ensembl_id.split(".")[0]} />


                          {/* Genomic location as a tag */}
                          <div className="mt-3">
                            <span className="text-xs font-medium text-muted-foreground mr-2">
                              Genomic location:
                            </span>
                            {accession ? (
                              coords[feature.gene_identifier] ? (
                                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-semibold">
                                  {coords[feature.gene_identifier]}
                                </span>
                              ) : (
                                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-semibold">
                                  Loading...
                                </span>
                              )
                            ) : (
                              <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-semibold">
                                N/A
                              </span>
                            )}
                          </div>


                          {/* Protein / RNA info */}
                          <p className="text-sm mt-2 truncate max-w-md">
                            {feature.gene_identifier && (
                              <span className="font-medium">Protein:</span>
                            )}
                            {feature.protein_identifier && ` ${feature.protein_identifier} | `}
                            <span className="font-medium">RNA transcript:</span> {feature.ensembl_id}
                          </p>
                        </div>
                      </div>

                      {/* Buttons row at bottom right */}
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onOrthologSearch(feature.gene_id)}
                        >
                          Orthologs
                        </Button>
                        <Button
                          disabled={true}
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("JBrowse for", feature.ensembl_id)}
                        >
                          JBrowse
                        </Button>
                      </div>
                    </div>
                  )
                })}
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
