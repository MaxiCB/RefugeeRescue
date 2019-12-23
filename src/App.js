import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

import './App.css';

const mapBoxToken = 'pk.eyJ1IjoiYWFyb25jYiIsImEiOiJjazRpM2E5M2cwcXdkM21xeGEwMHZ6Y2hiIn0.66ClWT4waW7ZhoNq2y0Cvg';
const mapStyle = 'mapbox://styles/mapbox/dark-v10';

const countryData = require('./data/countries.json');
const refugeeData = require('./data/data.json');

let displayData;

const viewState = {
  // longitude: -122.41669,
  // latitude: 37.7853,
  longitude: 1,
  latitude: 32,
  zoom: 2,
  pitch: 0,
  bearing: 0
};

// Need to scale data down to single year. Will use the most recent data to eliminate some edge cases.

// Need to implement parsing off the data.json
// Each item in the data files needs to pass the country name into a function to get the lat and long of country
// Total can determine the size of the marker

const buildHeat =() => {
  return new HeatmapLayer({
    id: 'heat',
    data: refugeeData,
    getPosition: d => findCountry(d.country),
    getWeight: d => d.total * 1.4,
    radiusPixels: 60,
  })
}

// This is a dope layer but it was only added for helping clean the data.

// const buildScatter = () => {
//   return new ScatterplotLayer({
//     id: 'scatter',
//     data: refugeeData,
//     filled: true,
//     radiusMinPixels: 10,
//     radiusMaxPixels: 100,
//     getPosition: d => findCountry(d.country),
//     pickable: true,
//     onHover: ({object, x, y}) => {
//       if(object) {
//         const { latlng } = object;
//         console.log(object);
//       }
//     }
//   })
// }

const findCountry = (refugeeCountry) => {
  let country = countryData.find(item => item.name === refugeeCountry)
  if(country != undefined){
    console.log(country.latlng[1], country.latlng[0]);
    return [country.latlng[1], country.latlng[0]];
  }
}

function App() {
  return (
    <DeckGL initialViewState={viewState} height='100%' width='100%' controller={true} layers={buildHeat()}>
       {/* <DeckGL initialViewState={viewState} height='100%' width='100%' controller={true} layers={flight}> */}
        <StaticMap mapStyle={mapStyle} mapboxApiAccessToken={mapBoxToken}/>
      </DeckGL>
  );
}

export default App;
