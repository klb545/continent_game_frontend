import React, { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
const SERVER_URL = 'http://localhost:8080';

const MapChart = ({topologyUrl}) => {

    return ( 
        <ComposableMap>
            <Geographies geography={topologyUrl}>
                {({ geographies }) =>
                geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                ))
                }
            </Geographies>
        </ComposableMap>
     );
}
 
export default MapChart;


