import React from 'react';
import { JBrowseLinearGenomeView, createViewState } from '@jbrowse/react-linear-genome-view';

const GenomeBrowser = () => {
  const viewState = createViewState({
    assembly: {
      name: 'caudatum',
      sequence: {
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
    },
    tracks: [
      {
        type: 'FeatureTrack',
        trackId: 'caudatum_annotation',
        name: 'Annotations (GFF3)',
        assemblyNames: ['caudatum'],
        adapter: {
          type: 'Gff3TabixAdapter',
          gffGzLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_annotation_v1.sorted.gff3.gz',
            locationType: 'UriLocation',
          },
          index: {
            location: {
              uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_annotation_v1.sorted.gff3.gz.tbi',
              locationType: 'UriLocation',
            },
            indexType: 'TBI',
          },
        },
      },
    ],
    defaultSession: {
      name: 'Default session',
      views: [
        {
          id: 'linearView',
          type: 'LinearGenomeView',
        },
      ],
    },
  });

  return (
    <div className="h-[700px] border rounded-lg shadow-md">
      <div className="bg-gray-100 p-2 text-center font-semibold">
        Paramecium caudatum Genome Browser
      </div>
      <JBrowseLinearGenomeView viewState={viewState} />
    </div>
  );
};

export default GenomeBrowser;
