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
        trackId: 'volvox_genes',
        name: 'Genes',
        assemblyNames: ['volvox'],
        adapter: {
          type: 'Gff3Adapter',
          gffLocation: {
            uri: 'https://jbrowse.org/genomes/volvox/volvox.gff3',
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
        offsetPx: 0,
        bpPerPx: 0.1,
        tracks: [
          { 
            id: 'track_volvox_genes', 
            type: 'FeatureTrack', 
            configuration: 'volvox_genes'
          },
        ],
      },
    },
    location: 'ctgA:1100..1165',
  });

  return (
    <div style={{ height: '500px' }}>
      <JBrowseLinearGenomeView viewState={state} />
    </div>
  );
};

export default GenomeBrowser;