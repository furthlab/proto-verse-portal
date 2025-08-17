import React from 'react'
import { JBrowseLinearGenomeView, createViewState } from '@jbrowse/react-linear-genome-view'

const GenomeBrowser = () => {
  const viewState = createViewState({
    assembly: {
      name: 'caudatum',
      sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'caudatum_refseq',
        adapter: {
          type: 'BgzipFastaAdapter',
          fastaLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz',
          },
          faiLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz.fai',
          },
          gziLocation: {
            uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_assembly_v1.fa.gz.gzi',
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
          },
          index: {
            location: {
              uri: 'https://3mg010.s3.us-east-1.amazonaws.com/genomes/caudatum_43c3d_annotation_v1.sorted.gff3.gz.tbi',
            },
          },
        },
      },
    ],
    // Open directly on scaffold_0001 region
    location: 'scaffold_0001:338696..338760',
    defaultSession: {
      name: 'Caudatum Genome Session',
      view: {
        id: 'linearGenomeView',
        type: 'LinearGenomeView',
        tracks: [
          {
            type: 'ReferenceSequenceTrack',
            configuration: 'caudatum_refseq',
            displays: [
              {
                type: 'LinearReferenceSequenceDisplay',
                configuration: 'caudatum_refseq-LinearReferenceSequenceDisplay',
              },
            ],
          },
          {
            type: 'FeatureTrack',
            configuration: 'caudatum_annotation',
            displays: [
              {
                type: 'LinearBasicDisplay',
                configuration: 'caudatum_annotation-LinearBasicDisplay',
              },
            ],
          },
        ],
      },
    },
  })

  return (
    <div className="h-[700px] border rounded-lg shadow-md">
      <div className="bg-gray-100 p-2 text-center font-semibold">
        Interactive Genome Browser
      </div>
      <JBrowseLinearGenomeView viewState={viewState} />
    </div>
  )
}

export default GenomeBrowser
