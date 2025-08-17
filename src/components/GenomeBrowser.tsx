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
    // Open on scaffold_0001 at 1-10000
    location: 'scaffold_0001:338,696..338,760', 
  })

  return (
    <div className="h-[700px] border rounded-lg shadow-md">
      <div className="bg-gray-100 p-2 text-center font-semibold">
        Paramecium caudatum Genome Browser
      </div>
      <JBrowseLinearGenomeView viewState={viewState} />
    </div>
  )
}

export default GenomeBrowser
