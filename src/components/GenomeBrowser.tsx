import React from 'react';
import { JBrowseLinearGenomeView, createViewState } from '@jbrowse/react-linear-genome-view';
import { PluginManager } from '@jbrowse/core/PluginManager';

// Import the plugins
import Gff3Plugin from '@jbrowse/plugin-gff3';
import FastaPlugin from '@jbrowse/plugin-fasta';
import LinearGenomeViewPlugin from '@jbrowse/plugin-linear-genome-view';

// Create the plugin manager and load plugins
const pluginManager = new PluginManager();
pluginManager.addPlugin(new FastaPlugin());
pluginManager.addPlugin(new Gff3Plugin());
pluginManager.addPlugin(new LinearGenomeViewPlugin());

const GenomeBrowser = () => {
  const state = createViewState({
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
    <div className="h-[600px]">
      <JBrowseLinearGenomeView viewState={state} />
    </div>
  );
};

export default GenomeBrowser;
