import '@fontsource/roboto';
import React from 'react';
import {
  createViewState,
  JBrowseLinearGenomeView,
} from '@jbrowse/react-linear-genome-view';

const GenomeBrowser = () => {
  const state = createViewState({
    assembly: {
      name: 'GRCh38',
      sequence: {
        adapter: {
          type: 'BgzipFastaAdapter',
          fastaLocation: {
            uri: 'https://jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz',
            locationType: 'UriLocation',
          },
          faiLocation: {
            uri: 'https://jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz.fai',
            locationType: 'UriLocation',
          },
          gziLocation: {
            uri: 'https://jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz.gzi',
            locationType: 'UriLocation',
          },
        },
      },
    },
    tracks: [],
    location: '1:100,987,269..100,987,368',
  });

  return (
    <div style={{ height: '500px' }}>
      <JBrowseLinearGenomeView viewState={state} />
    </div>
  );
};

export default GenomeBrowser;
