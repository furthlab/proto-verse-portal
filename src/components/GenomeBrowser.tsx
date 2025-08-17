import '@fontsource/roboto';
import React from 'react';
import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view';

const GenomeBrowser = () => {
  const state = createViewState({
    assembly: {
      name: 'caudatum',
      sequence: {
        type: 'FastaAdapter',
        fastaLocation: {
          uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz',
          locationType: 'UriLocation',
        },
        index: {
          location: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz.tbi',
            locationType: 'UriLocation',
          },
          indexType: 'TBI',
        },
      },
    },
    tracks: [
      {
        type: 'ReferenceSequenceTrack',
        trackId: 'caudatum_refseq',
        name: 'Reference sequence (caudatum)',
        assemblyNames: ['caudatum'],
        category: ['Reference'],
        adapter: {
          type: 'FastaAdapter',
          fastaLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz',
            locationType: 'UriLocation',
          },
          index: {
            location: {
              uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz.tbi',
              locationType: 'UriLocation',
            },
            indexType: 'TBI',
          },
        },
      },
      {
        type: 'FeatureTrack',
        trackId: 'caudatum_annotation',
        name: 'Annotations (GFF3)',
        assemblyNames: ['caudatum'],
        category: ['Annotations'],
        adapter: {
          type: 'Gff3Adapter',
          gffLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_annotation_v1.sorted.gff3.gz',
            locationType: 'UriLocation',
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
            id: 'caudatum_refseq',
            type: 'ReferenceSequenceTrack',
            configuration: 'caudatum_refseq',
            displays: [
              {
                id: 'caudatum_refseq-LinearReferenceSequenceDisplay',
                type: 'LinearReferenceSequenceDisplay',
                configuration: 'caudatum_refseq-LinearReferenceSequenceDisplay',
              },
            ],
          },
          {
            id: 'caudatum_annotation',
            type: 'FeatureTrack',
            configuration: 'caudatum_annotation',
            displays: [
              {
                id: 'caudatum_annotation-LinearBasicDisplay',
                type: 'LinearBasicDisplay',
                configuration: 'caudatum_annotation-LinearBasicDisplay',
              },
            ],
          },
        ],
      },
    },
    location: 'scaffold_0011:43248..46019',
  });

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Genome Browser</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore genomic features, genes, and annotations with our integrated JBrowse2 genome browser.
            Navigate through chromosomes and discover the intricate details of genetic information.
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
            Currently viewing: Paramecium caudatum - scaffold_0011:43248..46019 (65bp zoom)
          </p>
        </div>
      </div>
    </section>
  );
};

export default GenomeBrowser;
