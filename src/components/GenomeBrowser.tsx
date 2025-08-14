import React from 'react';
import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view';

const GenomeBrowser = () => {
  const assembly = {
    name: 'hg38',
    aliases: ['GRCh38'],
    sequence: {
      type: 'ReferenceSequenceTrack',
      trackId: 'hg38-ReferenceSequenceTrack',
      adapter: {
        type: 'BgzipFastaAdapter',
        fastaLocation: {
          uri: 'https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz',
          locationType: 'UriLocation',
        },
        faiLocation: {
          uri: 'https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz.fai',
          locationType: 'UriLocation',
        },
        gziLocation: {
          uri: 'https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz.gzi',
          locationType: 'UriLocation',
        },
      },
    },
    refNameAliases: {
      adapter: {
        type: 'RefNameAliasAdapter',
        location: {
          uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/hg38_aliases.txt',
          locationType: 'UriLocation',
        },
      },
    },
  };

  const tracks = [
    {
      type: 'FeatureTrack',
      trackId: 'ncbi_refseq_109_hg38',
      name: 'NCBI RefSeq (GFF3Tabix)',
      assemblyNames: ['hg38'],
      category: ['Genes'],
      adapter: {
        type: 'Gff3TabixAdapter',
        gffGzLocation: {
          uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz',
          locationType: 'UriLocation',
        },
        index: {
          location: {
            uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi',
            locationType: 'UriLocation',
          },
        },
      },
    },
  ];

  const defaultSession = {
    name: 'Human Genome Browser',
    view: {
      id: 'linearGenomeView',
      type: 'LinearGenomeView',
      tracks: [
        {
          id: 'ncbi_refseq_109_hg38',
          type: 'FeatureTrack',
          configuration: 'ncbi_refseq_109_hg38',
          displays: [
            {
              id: 'ncbi_refseq_109_hg38-LinearBasicDisplay',
              type: 'LinearBasicDisplay',
              configuration: 'ncbi_refseq_109_hg38-LinearBasicDisplay',
            },
          ],
        },
      ],
      displayedRegions: [
        {
          refName: 'chr1',
          start: 67000000,
          end: 67200000,
          reversed: false,
          assemblyName: 'hg38',
        },
      ],
    },
  };

  const state = createViewState({
    assembly,
    tracks,
    location: 'chr1:67,000,000-67,200,000',
    defaultSession,
  });

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Interactive Genome Browser
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore genomic features, genes, and annotations with our integrated JBrowse2 genome browser.
            Navigate through chromosomes and discover the intricate details of genetic information.
          </p>
        </div>
        
        <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
          <div className="h-96">
            <JBrowseLinearGenomeView viewState={state} />
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Currently viewing: Human Genome (GRCh38) - Chromosome 1: 67,000,000-67,200,000
          </p>
        </div>
      </div>
    </section>
  );
};

export default GenomeBrowser;