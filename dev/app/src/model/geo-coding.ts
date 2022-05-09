import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

export type coordinate = { lng: number; lat: number };

export class GeoCoding {
    // Takes an adress and returns a promise of a coordinate
    // example of how to use. MUST import type coordinate in client code
    // const t = new GeoCoding();
    // let y = t.forwardGeoCoding("Chalmers").then((r:coordinate) =>{
    //          console.log(r)
    // });
    public async forwardGeoCoding(adress: string): Promise<coordinate> {
        //return coordinate
        let retCoord: coordinate = { lng: -1, lat: -1 };
        //encodes the adress to URL UTF-8
        let encodedAdress = encodeURI(adress);
        const promise = await axios
            .get(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                    encodedAdress +
                    ".json?" +
                    "proximity=ip&types=address%2Ccountry%2Cpostcode%2Cplace&" +
                    "access_token=" +
                    mapboxgl.accessToken
            )
            .then((response: any) => {
                retCoord.lng = response.data.features[0].center[0];
                retCoord.lat = response.data.features[0].center[1];
                //console.log(retCoord);
            })
            .catch((err) => {
                console.log(err);
            });
        return retCoord;
    }
}