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
            locationTyp
