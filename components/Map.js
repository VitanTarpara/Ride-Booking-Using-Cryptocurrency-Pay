import { useEffect, useContext } from 'react'
import mapboxgl from '!mapbox-gl'
import { UberContext } from '../context/uberContext'

const style = {
    wrapper: `flex-1 h-full w-full`,
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  
const Map = () => {
    const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext)

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mahir09/cl8hg3o2t001w15qrrn6rpzm1',
          center: [72.130, 22.801], // starting position [lng, lat]
      zoom: 6.5,
        })

        if (pickupCoordinates) {
            addToMap(map, pickupCoordinates)
        }
      
        if (dropoffCoordinates) {
            addToMap(map, dropoffCoordinates)
        }
    
        if (pickupCoordinates && dropoffCoordinates) {
            map.fitBounds([dropoffCoordinates, pickupCoordinates], {
              padding: 400,
            })
          }
    
    }, [pickupCoordinates, dropoffCoordinates])
  
    const addToMap = (map, coordinates) => {
        const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    }
    
    return <div className={style.wrapper} id='map' />
}

export default Map