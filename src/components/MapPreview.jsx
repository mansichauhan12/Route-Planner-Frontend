import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    useMap
}
    from "react-leaflet"

import { useEffect } from "react"



function FitRoute({ coordinates }) {


    const map = useMap()


    useEffect(() => {


        if (coordinates?.length) {

            map.fitBounds(
                coordinates
            )

        }


    }, [coordinates, map])


    return null
}





function MapPreview({ route }) {


    const coordinates = route?.coordinates || []



    return (

        <MapContainer

            center={[28.4595, 77.0266]}

            zoom={12}

            style={{
                height: "100%",
                width: "100%"
            }}

        >


            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />



            {
                coordinates.length > 0 &&

                <>


                    <Polyline

                        positions={coordinates}

                        pathOptions={{
                            color: "blue",
                            weight: 5
                        }}

                    />


                    <Marker
                        position={coordinates[0]}
                    />


                    <Marker
                        position={coordinates[coordinates.length - 1]}
                    />


                    <FitRoute
                        coordinates={coordinates}
                    />


                </>

            }



        </MapContainer>


    )

}


export default MapPreview