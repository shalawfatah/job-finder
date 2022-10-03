
import React, { useEffect } from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import iconPath from '../images/map_pin.png';
import { useAtom } from 'jotai';
import { dataAtom, searchAtom } from '../store/store';
import JOB_DATA from '../store/JOB_DATA.json';
import Card from './Card';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import '@changey/react-leaflet-markercluster/dist/styles.min.css'; // sass

const Map = () => {
    const map_tiles = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';
    const position = [51.505, -0.09];
    const isBrowser = typeof window !== "undefined"
    const [data, setData] = useAtom(dataAtom)
    const [search, setSearch] = useAtom(searchAtom);

    const filtered_jobs =  data?.filter(item => {
        if(search.length > 1) {
            return item?.job_title?.toLowerCase()?.trim()?.includes(search?.toLowerCase()?.trim())
        } else {
            return item;
        }
    })
    useEffect(() => {
        setData(JOB_DATA)
    }, [])


  return isBrowser ? (
    <div className='relative'>
        <input className='absolute top-0 p-2 left-0 right-0 mt-10 mx-20' style={{zIndex: '100000'}} placeholder="Search for something..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{height: "100vh", width: "100vw"}}>
            <TileLayer
            url={map_tiles}
            />
            <MarkerClusterGroup>
                {filtered_jobs?.map(item => {
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
                                    <Card title={item?.job_title} company={item?.company} address={item?.address} salary={item?.salary} skills={item?.skills} />
                                </Popup>
                        </Marker>
                })}
                </MarkerClusterGroup>
        </MapContainer></div> 
  ) : <p>Loading...</p>
}

export default Map