import React from "react";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";

import {
  Nav,
  NavItem,
  Navbar,
  NavLink,
  NavbarBrand
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const mapBoxToken =
  "pk.eyJ1IjoiYWFyb25jYiIsImEiOiJjazRpM2E5M2cwcXdkM21xeGEwMHZ6Y2hiIn0.66ClWT4waW7ZhoNq2y0Cvg";
const mapStyle = "mapbox://styles/mapbox/dark-v10";

const countryData = require("./data/countries.json");
const refugeeData = require("./data/data.json");

const viewState = {
  longitude: 1,
  latitude: 32,
  zoom: 2,
  pitch: 0,
  bearing: 0
};

const buildHeat = () => {
  return new HeatmapLayer({
    id: "heat",
    data: refugeeData,
    getPosition: d => findCountry(d.country),
    getWeight: d => d.total * 1.4,
    radiusPixels: 60
  });
};

const addRandom = () => {
  let rand = Math.random() * (1 - 0.02) + 0.01;
  return rand;
};

const findCountry = refugeeCountry => {
  let country = countryData.find(item => item.name === refugeeCountry);
  if (country != undefined) {
    console.log(
      country.latlng[1] + addRandom(),
      country.latlng[0] + addRandom()
    );
    return [country.latlng[1] + addRandom(), country.latlng[0] + addRandom()];
  }
};
const openWebsite = () => {
  window.open("https://maxicb.github.io/UI/");
};

function App() {
  return (
    <>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={buildHeat()}
      >
        <Navbar color="dark" dark expand="md">
        <NavbarBrand>RefugeeRescue</NavbarBrand>
        <Nav>
        <NavItem>
          <NavLink href="https://bw-refugee-stories2.github.io/UI/" active>
            Go Back
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/MaxiCB/RefugeeRescue" active>
            Source
          </NavLink>
        </NavItem>
      </Nav>
      </Navbar>
        <StaticMap mapStyle={mapStyle} mapboxApiAccessToken={mapBoxToken} />
      </DeckGL>
    </>
  );
}

export default App;
