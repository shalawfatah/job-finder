
import React from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import iconPath from '../images/map_pin.png';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useAtom } from 'jotai';
import { dataAtom } from '../store/store';
import JOB_DATA from '../store/JOB_DATA.json';

const Map = () => {
    const map_tiles = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';
    const position = [51.505, -0.09];


  return (
<MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
        url={map_tiles}
        />
            {JOB_DATA?.map(item => {
                        return <Marker 
                        position={[item?.latitude, item?.longitude]}
                        key={item?.id}
                        icon = { new Icon({
                            iconUrl: iconPath,
                            iconSize: [60, 62],
                            iconAnchor: [20, 32],
                            })} 
                        >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
            })}
    </MapContainer>
  )
}

export default Map