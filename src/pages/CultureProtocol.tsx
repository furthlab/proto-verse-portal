import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Beaker, Clock, ThermometerSun, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const CultureProtocol = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/getting-started">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Getting Started
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              🌾 Paramecium Culture Protocol
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete protocol for preparing wheat grass medium and culturing Paramecium
            </p>
          </div>

          <div className="space-y-6">
            {/* Reagents Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Required Reagents
                </CardTitle>
                <CardDescription>
                  ATCC medium 802: Sonneborn's Paramecium Medium
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-border p-2 text-left">Item</th>
                        <th className="border border-border p-2 text-left">Article Number</th>
                        <th className="border border-border p-2 text-left">Distributor</th>
                        <th className="border border-border p-2 text-left">Vendor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2">Wheat Grass Powder (WGP)</td>
                        <td className="border border-border p-2">122221</td>
                        <td className="border border-border p-2">Life Europe AB</td>
                        <td className="border border-border p-2">Superfruit</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Milli-Q water</td>
                        <td className="border border-border p-2">-</td>
                        <td className="border border-border p-2">Buffer stock room</td>
                        <td className="border border-border p-2">-</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Na₂HPO₄</td>
                        <td className="border border-border p-2">S7907-100G</td>
                        <td className="border border-border p-2">Merck</td>
                        <td className="border border-border p-2">SigmaAldrich</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">β-Sitosterol</td>
                        <td className="border border-border p-2">567152-5GM</td>
                        <td className="border border-border p-2">Merck</td>
                        <td className="border border-border p-2">EMD Millipore</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Main Protocol */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Medium Preparation Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium">Add <strong>2.5 g</strong> of wheat grass to <strong>1 Liter</strong> sterile water and boil for <strong>5 minutes</strong>.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium">Add <strong>100 ml</strong> sterile water to compensate for evaporation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium">Filter through <strong>Whatman #1</strong> filter paper.</p>
                    <p className="text-sm text-muted-foreground mt-1">Color of the medium will change from green to yellow hue, similar to LB medium.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <p className="font-medium">Add <strong>0.5 g Na₂HPO₄</strong>.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">5</Badge>
                  <div>
                    <p className="font-medium">Adjust <strong>pH to ~7.0</strong> with NaOH or HCl.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">6</Badge>
                  <div>
                    <p className="font-medium">Autoclave for <strong>15 minutes</strong> at <strong>121°C</strong>.</p>
                    <p className="text-sm text-muted-foreground mt-1">Store at <strong>4°C in dark</strong> until ready to inoculate with bacteria.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Steroid Supplement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-primary" />
                  Steroid Supplement Preparation
                </CardTitle>
                <CardDescription>
                  Paramecium requires a steroid as a growth factor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  β-sitosterol has extremely poor solubility in water and needs 99% ethanol (95% is not good enough).
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">Stock Solution (4mg/mL in pure ethanol):</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">β-sitosterol:</span> 40 mg
                    </div>
                    <div>
                      <span className="font-medium">99% Ethanol:</span> 10 mL
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Store at 4°C away from light. Add to medium just after bacterial inoculation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Klebsiella Inoculation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Klebsiella pneumoniae Inoculation
                </CardTitle>
                <CardDescription>
                  2-day process for bacterial culture and medium inoculation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
                  <p className="text-sm">
                    <strong>Important:</strong> It is crucial to let the bacteria bloom before adding the Paramecium. 
                    Klebsiella neutralizes toxic components in the wheat grass medium.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <p className="font-medium">Smear samples on LB agar plates and incubate at <strong>37°C overnight</strong>.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <p className="font-medium">In the morning verify culture growth.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <p className="font-medium">Collect bacteria with a loop and swirl in <strong>5 mL</strong> sterile wheat grass medium.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <p className="font-medium">Incubate on shaker (<strong>200 rpm</strong>) at <strong>37°C overnight</strong>.</p>
                      <p className="text-sm text-muted-foreground mt-1">Medium should go from clear yellow to opaque.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">5</Badge>
                    <div>
                      <p className="font-medium">Add β-sitosterol stock to final concentration of <strong>0.8 μg/mL</strong>.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For 50 mL culture: remove 10 μL medium, add 10 μL β-sitosterol (4mg/mL)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">6</Badge>
                    <div>
                      <p className="font-medium">Add <strong>100 μL</strong> of Paramecium from ongoing culture.</p>
                      <p className="text-sm text-muted-foreground mt-1">Incubate <strong>without</strong> shaking at <strong>27°C</strong>.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">7</Badge>
                    <div>
                      <p className="font-medium">Check culture daily for 2-3 days.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Take 20 μL from center just under water surface. Aim for 1000-2000 cells/mL.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reference */}
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">Original Protocol Source</h3>
                  <p className="text-sm text-muted-foreground">
                    This protocol is based on the detailed methodology from the Furth Lab.
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.furthlab.xyz/paramecium_medium" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CultureProtocol;