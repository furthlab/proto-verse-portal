import React from 'react';
import { JBrowseLinearGenomeView, createViewState } from '@jbrowse/react-linear-genome-view';
import { PluginManager } from '@jbrowse/core/PluginManager';

// Plugins
import LinearGenomeViewPlugin from '@jbrowse/plugin-linear-genome-view';
import Gff3Plugin from '@jbrowse/plugin-gff3';
import FastaPlugin from '@jbrowse/plugin-fasta';

const GenomeBrowser = () => {
  // Initialize plugin manager and load plugins
  const pluginManager = new PluginManager();
  pluginManager.addPlugin(new LinearGenomeViewPlugin());
  pluginManager.addPlugin(new FastaPlugin());
  pluginManager.addPlugin(new Gff3Plugin());

  // Create JBrowse view state
  const viewState = createViewState({
    assembly: {
      name: 'caudatum',
      sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'caudatum_refseq',
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
    },
    location: 'scaffold_0011:43248..46019',
    pluginManager,
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
