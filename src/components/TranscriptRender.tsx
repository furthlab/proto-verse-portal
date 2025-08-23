import React, { useEffect, useState } from "react";

type Exon = {
  start: number;
  end: number;
};

type Transcript = {
  start: number;
  end: number;
  strand: number;
  Exon?: Exon[];
  id?: string;
};

type GeneResponse = {
  start: number;
  end: number;
  strand: number;
  Exon?: Exon[];
  Transcript?: Transcript[];
  canonical_transcript?: string;
};

interface TranscriptSVGProps {
  transcriptId: string;
}

const TranscriptSVG: React.FC<TranscriptSVGProps> = ({ transcriptId }) => {
  const [geneData, setGeneData] = useState<GeneResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalWidth = 600;
  const exonHeight = 15;
  const intronY = 15;
  const arrowSize = 8;

  useEffect(() => {
    let isCancelled = false;

    const fetchTranscript = async () => {
      try {
        const url = `https://rest.ensembl.org/lookup/id/${transcriptId}?expand=1`;
        const response = await fetch(url, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get("Retry-After") || "5", 10);
          console.log(`Rate limit hit for ${transcriptId}. Retrying after ${retryAfter}s`);
          setTimeout(fetchTranscript, retryAfter * 1000);
          return;
        }

        if (!response.ok) throw new Error(`Ensembl API error: ${response.status}`);
        const data = await response.json();
        if (!isCancelled) setGeneData(data);
      } catch (err: any) {
        if (!isCancelled) setError(err.message);
      }
    };

    fetchTranscript();

    return () => {
      isCancelled = true;
    };
  }, [transcriptId]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!geneData) return <p>Loading...</p>;

  // Extract transcript
  let transcript: Transcript | undefined;
  if (geneData.Transcript && geneData.Transcript.length > 0) {
    transcript =
      geneData.Transcript.find((t) => t.id === geneData.canonical_transcript) ||
      geneData.Transcript[0];
  } else if (geneData.Exon) {
    transcript = { ...geneData, Exon: geneData.Exon };
  }

  if (!transcript?.Exon || transcript.Exon.length === 0) return <p>No exons to display</p>;

  const strand = transcript.strand;

  // Sort exons by strand-aware transcription direction
  const sortedExons =
    strand === 1
      ? [...transcript.Exon].sort((a, b) => a.start - b.start)
      : [...transcript.Exon].sort((a, b) => b.end - a.end);

  const transcriptStart = transcript.start;
  const transcriptEnd = transcript.end;
  const scale = (totalWidth - arrowSize) / (transcriptEnd - transcriptStart);
  const xOffset = strand === -1 ? arrowSize : 0;

  const exonColor = (index: number, totalExons: number) =>
    index === 0 || index === totalExons - 1 ? "lightgray" : "#f9dcbd";

  const lastExonIndex = sortedExons.length - 1;

  return (
    <svg width={totalWidth} height={exonHeight + 10} xmlns="http://www.w3.org/2000/svg">
      {/* intron line */}
      <line
        x1={xOffset}
        y1={intronY}
        x2={totalWidth}
        y2={intronY}
        stroke="black"
        strokeWidth={1.5}
      />

      {sortedExons.map((exon, i) => {
        const x = (exon.start - transcriptStart) * scale + xOffset;
        const w = (exon.end - exon.start) * scale;
        const isLast = i === lastExonIndex;
        const fillColor = exonColor(i, sortedExons.length);

        if (isLast) {
          if (strand === 1) {
            return (
              <polygon
                key={i}
                points={`
                  ${x},${intronY - exonHeight / 2}
                  ${x + w},${intronY - exonHeight / 2}
                  ${x + w + arrowSize},${intronY}
                  ${x + w},${intronY + exonHeight / 2}
                  ${x},${intronY + exonHeight / 2}
                `}
                fill={fillColor}
                stroke="black"
              />
            );
          } else {
            return (
              <polygon
                key={i}
                points={`
                  ${x + w},${intronY - exonHeight / 2}
                  ${x},${intronY - exonHeight / 2}
                  ${x - arrowSize},${intronY}
                  ${x},${intronY + exonHeight / 2}
                  ${x + w},${intronY + exonHeight / 2}
                `}
                fill={fillColor}
                stroke="black"
              />
            );
          }
        } else {
          return (
            <rect
              key={i}
              x={x}
              y={intronY - exonHeight / 2}
              width={w}
              height={exonHeight}
              fill={fillColor}
              stroke="black"
            />
          );
        }
      })}
    </svg>
  );
};

export default TranscriptSVG;
