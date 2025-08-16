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
    tracks: [],
  });

  return (
    <div style={{ height: '500px' }}>
      <JBrowseLinearGenomeView viewState={state} />
    </div>
  );
};

export default GenomeBrowser;
