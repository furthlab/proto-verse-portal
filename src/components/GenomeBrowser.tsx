import '@fontsource/roboto';
import React from 'react';
import {
  createViewState,
  JBrowseLinearGenomeView,
} from '@jbrowse/react-linear-genome-view';

const GenomeBrowser = () => {
  const state = createViewState({
    assembly: {
      name: 'paramecium_caudatum',
      sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'pc_refseq_assembly',
        adapter: {
          type: 'FastaAdapter', // Use FastaAdapter for .fa.gz files
          fastaLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz',
            locationType: 'UriLocation',
          },
          index: {
            location: {
              uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz.fai', // optional if you have an index
              locationType: 'UriLocation',
            },
          },
        },
      },
    },
    tracks: [
      {
        type: 'ReferenceSequenceTrack',
        trackId: 'pc_refseq',
        name: 'Reference sequence (Paramecium caudatum)',
        assemblyNames: ['paramecium_caudatum'],
        category: ['Reference'],
        adapter: {
          type: 'FastaAdapter',
          fastaLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz',
            locationType: 'UriLocation',
          },
          index: {
            location: {
              uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz.fai',
              locationType: 'UriLocation',
            },
          },
        },
      },
      {
        type: 'FeatureTrack',
        trackId: 'pc_gff_genes',
        name: 'Genes',
        assemblyNames: ['paramecium_caudatum'],
        category: ['Genes'],
        adapter: {
          type: 'Gff3TabixAdapter', // if your GFF3 is bgzipped & tabix-indexed
          gffGzLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_annotation_v1.sorted.gff3.gz',
            locationType: 'UriLocation',
          },
          index: {
            location: {
              uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_annotation_v1.sorted.gff3.gz.tbi', // tabix index
              locationType: 'UriLocation',
            },
          },
        },
      },
    ],
    defaultSession: {
      name: 'Default session',
      view: {
        id: 'linearGenomeView',
        type: 'LinearGenomeView',
        tracks: [
          {
            id: 'pc_refseq',
            type: 'ReferenceSequenceTrack',
            configuration: 'pc_refseq',
            displays: [
              {
                id: 'pc_refseq-LinearReferenceSequenceDisplay',
                type: 'LinearReferenceSequenceDisplay',
                configuration: 'pc_refseq-LinearReferenceSequenceDisplay',
              },
            ],
          },
        ],
      },
    },
    location: 'scaffold_0011:43248..46019', // adjust to a Paramecium contig if desired
  });

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Interactive Genome Browser
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore genomic features, genes, and annotations of Paramecium caudatum.
          </p>
        </div>
      </div>
      
      <div className="w-full bg-background border-y shadow-sm overflow-hidden">
        <div className="h-96">
          <JBrowseLinearGenomeView viewState={state} />
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 mt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Currently viewing: Paramecium caudatum - ctgA:1100..1165
          </p>
        </div>
      </div>
    </section>
  );
};

export default GenomeBrowser;
