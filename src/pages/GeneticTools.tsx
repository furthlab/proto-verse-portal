import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import indicatorLinesImg from "@/assets/transgenic_strains.svg"; // <-- Import your image
import indicatorLinesImg from "@/assets/pSF-aTubCaud.svg"; // <-- Import your image

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type OrganismKey =
  | "human"
  | "mouse"
  | "fly"
  | "paramecium_tetraurelia"
  | "paramecium_caudatum";

type CodonTable = Record<string, number>;

// Codon usage tables for each organism (per 1000; values are percentages so we will divide by 100 when needed)
const codonTables: Record<OrganismKey, CodonTable> = {
  human: {
    TTT: 17.6, TTC: 20.3, TTA: 7.7, TTG: 12.9,
    TCT: 15.2, TCC: 17.7, TCA: 12.2, TCG: 4.4,
    TAT: 12.2, TAC: 15.3, TAA: 1.0, TAG: 0.8,
    TGT: 10.6, TGC: 12.6, TGA: 1.6, TGG: 13.2,
    CTT: 13.2, CTC: 19.6, CTA: 7.2, CTG: 39.6,
    CCT: 17.5, CCC: 19.8, CCA: 16.9, CCG: 6.9,
    CAT: 10.9, CAC: 15.1, CAA: 12.3, CAG: 34.2,
    CGT: 4.5, CGC: 10.4, CGA: 6.2, CGG: 11.4,
    ATT: 16.0, ATC: 20.8, ATA: 7.5, ATG: 22.0,
    ACT: 13.1, ACC: 18.9, ACA: 15.1, ACG: 6.1,
    AAT: 17.0, AAC: 19.1, AAA: 24.4, AAG: 31.9,
    AGT: 12.1, AGC: 19.5, AGA: 12.2, AGG: 12.0,
    GTT: 11.0, GTC: 14.5, GTA: 7.1, GTG: 28.1,
    GCT: 18.4, GCC: 27.7, GCA: 15.8, GCG: 7.4,
    GAT: 21.8, GAC: 25.1, GAA: 29.0, GAG: 39.6,
    GGT: 10.8, GGC: 22.2, GGA: 16.5, GGG: 16.5,
  },
  mouse: {
    TTT: 17.2, TTC: 21.8, TTA: 6.7, TTG: 13.4,
    TCT: 16.2, TCC: 18.1, TCA: 11.8, TCG: 4.2,
    TAT: 12.2, TAC: 16.1, TAA: 1.0, TAG: 0.8,
    TGT: 11.4, TGC: 12.3, TGA: 1.6, TGG: 12.5,
    CTT: 13.4, CTC: 20.2, CTA: 8.1, CTG: 39.5,
    CCT: 18.4, CCC: 18.2, CCA: 17.3, CCG: 6.2,
    CAT: 10.6, CAC: 15.3, CAA: 12.0, CAG: 34.1,
    CGT: 4.7, CGC: 9.4, CGA: 6.6, CGG: 10.2,
    ATT: 15.4, ATC: 22.5, ATA: 7.4, ATG: 22.8,
    ACT: 13.7, ACC: 19.0, ACA: 16.0, ACG: 5.6,
    AAT: 15.6, AAC: 20.3, AAA: 21.9, AAG: 33.6,
    AGT: 12.7, AGC: 19.7, AGA: 12.1, AGG: 12.2,
    GTT: 10.7, GTC: 15.4, GTA: 7.4, GTG: 28.4,
    GCT: 20.0, GCC: 26.0, GCA: 15.8, GCG: 6.4,
    GAT: 21.0, GAC: 26.0, GAA: 27.0, GAG: 39.4,
    GGT: 11.4, GGC: 21.2, GGA: 16.8, GGG: 15.2,
  },
  fly: {
    TTT: 13.2, TTC: 21.8, TTA: 4.5, TTG: 16.1,
    TCT: 7.0, TCC: 19.6, TCA: 7.8, TCG: 16.6,
    TAT: 10.8, TAC: 18.4, TAA: 0.8, TAG: 0.7,
    TGT: 5.4, TGC: 13.2, TGA: 0.5, TGG: 9.9,
    CTT: 9.0, CTC: 13.8, CTA: 8.2, CTG: 38.2,
    CCT: 6.9, CCC: 18.1, CCA: 13.5, CCG: 15.8,
    CAT: 10.8, CAC: 16.2, CAA: 15.6, CAG: 36.1,
    CGT: 8.8, CGC: 18.0, CGA: 8.4, CGG: 8.2,
    ATT: 16.6, ATC: 22.9, ATA: 9.5, ATG: 23.6,
    ACT: 9.5, ACC: 21.3, ACA: 11.0, ACG: 14.4,
    AAT: 21.0, AAC: 26.2, AAA: 17.0, AAG: 39.5,
    AGT: 11.5, AGC: 20.4, AGA: 5.1, AGG: 6.3,
    GTT: 11.0, GTC: 13.9, GTA: 6.4, GTG: 27.8,
    GCT: 14.4, GCC: 33.6, GCA: 12.8, GCG: 14.0,
    GAT: 27.6, GAC: 24.6, GAA: 21.1, GAG: 42.5,
    GGT: 13.3, GGC: 26.7, GGA: 18.0, GGG: 4.7,
  },
  paramecium_tetraurelia: {
    TTT: 31.5, TTC: 16.2, TTA: 34.7, TTG: 26.7,
    TCT: 16.0, TCC: 6.2, TCA: 20.6, TCG: 2.7,
    TAT: 30.0, TAC: 10.4, TAA: 41.1, TAG: 12.6,
    TGT: 12.9, TGC: 6.7, TGA: 2.1, TGG: 8.3,
    CTT: 10.8, CTC: 5.6, CTA: 9.0, CTG: 4.1,
    CCT: 11.8, CCC: 3.3, CCA: 15.7, CCG: 0.9,
    CAT: 12.7, CAC: 3.6, CAA: 22.8, CAG: 4.5,
    CGT: 1.9, CGC: 0.5, CGA: 2.3, CGG: 0.3,
    ATT: 38.1, ATC: 17.0, ATA: 24.1, ATG: 21.6,
    ACT: 21.3, ACC: 6.5, ACA: 20.4, ACG: 1.7,
    AAT: 49.1, AAC: 12.9, AAA: 56.5, AAG: 27.7,
    AGT: 13.9, AGC: 5.1, AGA: 26.2, AGG: 4.2,
    GTT: 21.7, GTC: 9.0, GTA: 12.3, GTG: 9.8,
    GCT: 19.8, GCC: 7.8, GCA: 17.3, GCG: 1.1,
    GAT: 43.7, GAC: 10.1, GAA: 49.7, GAG: 17.3,
    GGT: 12.0, GGC: 4.6, GGA: 25.2, GGG: 4.0,
  },
  paramecium_caudatum: {
    // Provided custom table where TGA is stop; TAA/TAG reassigned in ciliate map logic
    AAA: 26.5, GTT: 43.3, CCT: 37.0, CAG: 5.1,
    GAA: 77.7, GGA: 53.4, ATC: 14.5, AGG: 12.0,
    AAT: 83.0, TTG: 20.1, GGT: 30.0, CTG: 3.6,
    TAA: 56.5, ACT: 39.6, AAC: 17.0, GGG: 9.2,
    GAT: 85.7, GCA: 45.8, CTA: 10.7, CAC: 18.5,
    TTA: 42.7, AGT: 24.9, TAC: 23.1, CGA: 9.0,
    ATT: 49.3, CCA: 51.9, TGG: 100.0, GGC: 7.4,
    TTT: 28.2, CTT: 16.0, GTG: 16.1, CCC: 8.5,
    TAT: 76.9, TCT: 23.0, GAC: 14.3, CGT: 7.5,
    ATA: 36.2, GAG: 22.3, CTC: 6.9, TCG: 3.5,
    AGA: 68.2, GCT: 39.1, GTC: 10.9, TGA: 100.0,
    ACA: 48.1, CAT: 81.5, TCC: 7.5, ACG: 2.9,
    TCA: 34.5, GTA: 29.7, GCC: 12.8, GCG: 2.4,
    AAG: 73.5, TTC: 71.8, TGC: 26.9, CCG: 2.6,
    ATG: 100.0, TGT: 73.1, ACC: 9.4, CGC: 2.1,
    CAA: 24.0, TAG: 14.5, AGC: 6.6, CGG: 1.1,
  },
};

// Amino acid to codon mapping (standard code)
const aminoAcidMap: Record<string, string[]> = {
  F: ["TTT", "TTC"],
  L: ["TTA", "TTG", "CTT", "CTC", "CTA", "CTG"],
  I: ["ATT", "ATC", "ATA"],
  M: ["ATG"],
  V: ["GTT", "GTC", "GTA", "GTG"],
  S: ["TCT", "TCC", "TCA", "TCG", "AGT", "AGC"],
  P: ["CCT", "CCC", "CCA", "CCG"],
  T: ["ACT", "ACC", "ACA", "ACG"],
  A: ["GCT", "GCC", "GCA", "GCG"],
  Y: ["TAT", "TAC"],
  H: ["CAT", "CAC"],
  Q: ["CAA", "CAG"],
  N: ["AAT", "AAC"],
  K: ["AAA", "AAG"],
  D: ["GAT", "GAC"],
  E: ["GAA", "GAG"],
  C: ["TGT", "TGC"],
  W: ["TGG"],
  R: ["CGT", "CGC", "CGA", "CGG", "AGA", "AGG"],
  G: ["GGT", "GGC", "GGA", "GGG"],
  stop: ["TAA", "TAG", "TGA"],
};

// Codon to amino acid mapping (standard)
const codonToAminoAcid: Record<string, string> = {
  TTT: "F", TTC: "F", TTA: "L", TTG: "L",
  TCT: "S", TCC: "S", TCA: "S", TCG: "S",
  TAT: "Y", TAC: "Y", TAA: "stop", TAG: "stop",
  TGT: "C", TGC: "C", TGA: "stop", TGG: "W",
  CTT: "L", CTC: "L", CTA: "L", CTG: "L",
  CCT: "P", CCC: "P", CCA: "P", CCG: "P",
  CAT: "H", CAC: "H", CAA: "Q", CAG: "Q",
  CGT: "R", CGC: "R", CGA: "R", CGG: "R",
  ATT: "I", ATC: "I", ATA: "I", ATG: "M",
  ACT: "T", ACC: "T", ACA: "T", ACG: "T",
  AAT: "N", AAC: "N", AAA: "K", AAG: "K",
  AGT: "S", AGC: "S", AGA: "R", AGG: "R",
  GTT: "V", GTC: "V", GTA: "V", GTG: "V",
  GCT: "A", GCC: "A", GCA: "A", GCG: "A",
  GAT: "D", GAC: "D", GAA: "E", GAG: "E",
  GGT: "G", GGC: "G", GGA: "G", GGG: "G",
};

// Ciliate genetic code adjustments (Paramecium spp.): TAA/TAG => Q, only TGA is stop
const aminoAcidMapCiliates: Record<string, string[]> = {
  F: ["TTT", "TTC"],
  L: ["TTA", "TTG", "CTT", "CTC", "CTA", "CTG"],
  S: ["TCT", "TCC", "TCA", "TCG", "AGT", "AGC"],
  Y: ["TAT", "TAC"],
  Q: ["CAA", "CAG", "TAA", "TAG"],
  C: ["TGT", "TGC"],
  stop: ["TGA"],
  W: ["TGG"],
  P: ["CCT", "CCC", "CCA", "CCG"],
  H: ["CAT", "CAC"],
  R: ["CGT", "CGC", "CGA", "CGG", "AGA", "AGG"],
  I: ["ATT", "ATC", "ATA"],
  M: ["ATG"],
  T: ["ACT", "ACC", "ACA", "ACG"],
  N: ["AAT", "AAC"],
  K: ["AAA", "AAG"],
  V: ["GTT", "GTC", "GTA", "GTG"],
  A: ["GCT", "GCC", "GCA", "GCG"],
  D: ["GAT", "GAC"],
  E: ["GAA", "GAG"],
  G: ["GGT", "GGC", "GGA", "GGG"],
};

const codonToAminoAcidCiliates: Record<string, string> = {
  TTT: "F", TTC: "F",
  TTA: "L", TTG: "L",
  TCT: "S", TCC: "S", TCA: "S", TCG: "S",
  TAT: "Y", TAC: "Y",
  TAA: "Q", TAG: "Q",
  TGT: "C", TGC: "C",
  TGA: "stop",
  TGG: "W",
  CTT: "L", CTC: "L", CTA: "L", CTG: "L",
  CCT: "P", CCC: "P", CCA: "P", CCG: "P",
  CAT: "H", CAC: "H",
  CAA: "Q", CAG: "Q",
  CGT: "R", CGC: "R", CGA: "R", CGG: "R",
  AGA: "R", AGG: "R",
  ATT: "I", ATC: "I", ATA: "I",
  ATG: "M",
  ACT: "T", ACC: "T", ACA: "T", ACG: "T",
  AAT: "N", AAC: "N",
  AAA: "K", AAG: "K",
  AGT: "S", AGC: "S",
  GTT: "V", GTC: "V", GTA: "V", GTG: "V",
  GCT: "A", GCC: "A", GCA: "A", GCG: "A",
  GAT: "D", GAC: "D",
  GAA: "E", GAG: "E",
  GGT: "G", GGC: "G", GGA: "G", GGG: "G",
};

function isCiliate(org: OrganismKey) {
  return org === "paramecium_tetraurelia" || org === "paramecium_caudatum";
}

function optimizeCodon(
  codon: string,
  table: CodonTable,
  map: Record<string, string[]>,
  threshold: number,
  applyThreshold: boolean
) {
  const effectiveThreshold = applyThreshold ? threshold : 1; // 1 => almost always optimize

  // Find amino acid for given codon
  let aminoAcid = "";
  for (const [aa, codons] of Object.entries(map)) {
    if (codons.includes(codon)) {
      aminoAcid = aa;
      break;
    }
  }
  if (!aminoAcid) return codon; // unknown codon, keep as-is

  const currentFrequency = (table[codon] ?? 0) / 100; // normalize to 0..1
  if (currentFrequency >= effectiveThreshold) return codon;

  // choose synonymous codon with highest usage
  let best = codon;
  let maxFreq = -1;
  for (const c of map[aminoAcid]) {
    const f = table[c] ?? 0;
    if (f > maxFreq) {
      maxFreq = f;
      best = c;
    }
  }
  return best;
}

export default function GeneticTools() {
  // SEO
  useEffect(() => {
    const title = "Genetic Tools – Codon Optimizer | ProtoMem";
    const desc = "Optimize DNA codons for human, mouse, fly, and Paramecium using species-specific usage tables.";
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = window.location.href;
    else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }

    const ld = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Codon Optimizer",
      applicationCategory: "Bioinformatics",
      operatingSystem: "Web",
      url: window.location.href,
      description: desc,
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [organism, setOrganism] = useState<OrganismKey>("human");
  const [dna, setDna] = useState("ATGCAGACCGCTGACCGCGACCAAATATAC");
  const [applyThreshold, setApplyThreshold] = useState(true);
  const [threshold, setThreshold] = useState(0.2); // 0..1
  const [output, setOutput] = useState("");

  const table = useMemo(() => codonTables[organism], [organism]);

  const handleOptimize = () => {
    const useCiliate = isCiliate(organism);
    const aaMap = useCiliate ? aminoAcidMapCiliates : aminoAcidMap;
    const codonToAA = useCiliate ? codonToAminoAcidCiliates : codonToAminoAcid;

    const seq = dna.toUpperCase().replace(/[^ACGT]/g, "");
    let optimized = "";
    let protein = "";

    for (let i = 0; i < seq.length; i += 3) {
      const codon = seq.slice(i, i + 3);
      if (codon.length !== 3) continue;
      const optimizedCodon = optimizeCodon(codon, table, aaMap, threshold, applyThreshold);
      optimized += optimizedCodon;
      const aa = codonToAA[optimizedCodon];
      protein += aa ?? "";
    }

    const result = `>DNA\n${optimized}\n>Protein\n${protein}`;
    setOutput(result);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Genetic tools</h1>
      <h2 className="text-xl font-bold tracking-tight text-foreground">The pSF-aTubCaud vector</h2>

      <div className="flex flex-col lg:flex-row items-start gap-6 mt-4">

  <div className="text-sm text-muted-foreground lg:w-1/2">
  We have deposited and onboarded a vector backbone to Twist Biosciences where any insert can be placed between endogenous alpha-tubulin promotor and 5'UTR of <i>P.caudatum</i> and its 3'UTR with a polyadenylation signal (PAS) . This ensures robust and predictable expression in <i>P.caudatum</i>. 
      As a user you can merely codon optimize your sequence in the tool below and then order inserts with pSF-aTubCaud vector backbone from Twist Biosciences. 
  </div>

  <img 
    src={vectorImg} 
    alt="vector backbone" 
    className="rounded-lg h-96 lg:w-1/2 object-contain"
  />

</div>

      <h2 className="text-xl font-bold tracking-tight text-foreground">Transgenic strains</h2>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        We have developed a set of calcium and voltage indicators.
        </p>
        
        <div className="flex flex-col lg:flex-row items-start gap-6 mt-4">
  <img 
    src={indicatorLinesImg} 
    alt="Calcium and voltage indicators" 
    className="rounded-lg h-96 lg:w-1/2 object-contain"
  />
  <div className="text-sm text-muted-foreground lg:w-1/2">
    <p>
      We have generated three codon-optimized constructs for <em>P. caudatum</em>, 
      where rare codons (occurrence &lt; 20%) were replaced. Each coding sequence is 
      inserted between 5′ and 3′ UTRs of the <em>P. caudatum</em> α-tubulin gene 
      in the pSF-aTubCaud vector (derived from pTZ18U). Plasmids are linearized 
      with <code>ApaI</code> before microinjection. 
    </p>
    <ul className="list-disc ml-4 mt-2 space-y-1">
      <li>
        🟢 <strong>FLAG-GCaMP8s</strong> – insert size 2427 bp (plasmid 5279 bp) 
        (<a href="https://www.nature.com/articles/s41586-023-05828-9" target="_blank" rel="noopener noreferrer">Nature 2023</a>)
      </li>
      <li>
        🔴 <strong>pACE</strong> – insert size 2785 bp (plasmid 5637 bp) 
        (<a href="https://www.science.org/doi/10.1126/science.abm8797" target="_blank" rel="noopener noreferrer">Science 2022</a>)
      </li>
      <li>
        🔵 <strong>ASAP5</strong> – insert size 2433 bp (plasmid 5285 bp) 
        (<a href="https://www.cell.com/neuron/fulltext/S0896-6273(24)00643-3" target="_blank" rel="noopener noreferrer">Neuron 2024</a>)
      </li>
    </ul>
    <p className="mt-2">
      Bacterial resistance: Ampicillin (100 µg/mL). Growth temperature: 30 °C. Host strain: NEB Stable.
    </p>
  </div>
</div>

        <h2 className="text-xl font-bold tracking-tight text-foreground">Codon optimizer</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Optimize coding sequences for target organisms using species-specific codon usage. Supports human, mouse, fly, and Paramecium (ciliate code).
        </p>
      </header>

      <main>
        <section aria-labelledby="codon-optimizer" className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Input DNA sequence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label htmlFor="dna-seq">DNA (A/C/G/T)</Label>
              <Textarea
                id="dna-seq"
                value={dna}
                onChange={(e) => setDna(e.target.value)}
                rows={10}
                className="font-mono"
                placeholder="Paste your coding sequence here"
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Target organism</Label>
                <Select value={organism} onValueChange={(v) => setOrganism(v as OrganismKey)}>
                  <SelectTrigger aria-label="Select organism">
                    <SelectValue placeholder="Select organism" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="human">Homo sapiens [9606]</SelectItem>
                    <SelectItem value="mouse">Mus musculus [10090]</SelectItem>
                    <SelectItem value="fly">Drosophila melanogaster [7227]</SelectItem>
                    <SelectItem value="paramecium_tetraurelia">Paramecium tetraurelia [5888]</SelectItem>
                    <SelectItem value="paramecium_caudatum">Paramecium caudatum [5885]</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="apply-threshold">Apply codon frequency threshold</Label>
                  <p className="text-xs text-muted-foreground">Keep original codon if usage ≥ threshold (0–1).</p>
                </div>
                <Switch id="apply-threshold" checked={applyThreshold} onCheckedChange={setApplyThreshold} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                />
              </div>

              <Button className="w-full" onClick={handleOptimize}>Optimize codons</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Optimized output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label htmlFor="optimized">FASTA</Label>
              <Textarea id="optimized" value={output} readOnly rows={10} className="font-mono" />
            </CardContent>
          </Card>
        </section>

        <section className="mt-8" aria-labelledby="codon-usage">
          <Card>
            <CardHeader>
              <CardTitle>Codon usage table ({organism})</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs overflow-auto max-h-80 bg-muted/30 p-4 rounded-md">
{JSON.stringify(table, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
