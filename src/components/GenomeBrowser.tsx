import '@fontsource/roboto';
import React from 'react';
import {
  createViewState,
  JBrowseLinearGenomeView,
} from '@jbrowse/react-linear-genome-view';

const GenomeBrowser = () => {
  const state = createViewState({
    assembly: {
      name: 'volvox',
      sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'volvox_refseq',
        adapter: {
          type: 'TwoBitAdapter',
          twoBitLocation: {
            uri: 'https://jbrowse.org/genomes/volvox/volvox.2bit',
            locationType: 'UriLocation',
          },
        },
      },
    },
    tracks: [
      {
        type: 'FeatureTrack',
        trackId: 'volvox_gff_genes',
        name: 'Genes',
        assemblyNames: ['volvox'],
        category: ['Genes'],
        adapter: {
          type: 'Gff3Adapter',
          gffLocation: {
            uri: 'https://jbrowse.org/genomes/volvox/volvox.gff3',
            locationType: 'UriLocation',
          },
        },
      },
    ],
    location: 'ctgA:1105..4000',
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
            Currently viewing: Volvox Test Data - ctgA:1105..4000
          </p>
        </div>
      </div>
    </section>
  );
};

export default GenomeBrowser;
