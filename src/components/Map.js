
import React, { useEffect } from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import iconPath from '../images/map_pin.png';
import { useAtom } from 'jotai';
import { dataAtom } from '../store/store';
import JOB_DATA from '../store/JOB_DATA.json';

const Map = () => {
    const map_tiles = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';
    const position = [51.505, -0.09];
    const isBrowser = typeof window !== "undefined"
    const [data, setData] = useAtom(dataAtom)
    useEffect(() => {
        setData(JOB_DATA)
    }, [])


  return isBrowser ? (
      <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{height: "100vh", width: "100vw"}}>
            <TileLayer
            url={map_tiles}
            />
                {data?.map(item => {
                            return <Marker 
                            position={[item?.latitude, item?.longitude]}
                            key={item?.id}
                            icon = { new Icon({
                                iconUrl: iconPath,
                                iconSize: [40, 40],
                                iconAnchor: [20, 32],
                                })} 
                            >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker>
                })}
        </MapContainer> 
  ) : <p>Not defined</p>
}

export default Map