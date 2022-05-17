import axios from "axios";
import mapboxgl from "mapbox-gl";
import { Coordinate } from "../types/types";

export class GeoCoding {
    // Takes an adress and returns a promise of a coordinate
    // example of how to use. MUST import type coordinate in client code
    // const t = new GeoCoding();
    // let y = t.forwardGeoCoding("Chalmers").then((r:coordinate) =>{
    //          console.log(r)
    // });
    public async forwardGeoCoding(adress: string): Promise<Coordinate> {
        //return coordinate
        let retCoord: Coordinate = { lng: -1, lat: -1 };
        //encodes the adress to URL UTF-8
        let encodedAdress = encodeURI(adress);
        await axios
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
    //returns a Promise with the adress as a string.
    //Takes lng and lat (number) as inputs
    //see forwardGeoCoding for example of how to use the response
    public async reverseGeoCoding(lng: number, lat: number): Promise<string> {
        let retString: string = "";
        await axios
            .get(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                    lng +
                    "," +
                    lat +
                    ".json?" +
                    "access_token=" +
                    mapboxgl.accessToken
            )
            .then((response: any) => {
                retString = response.data.features[0].place_name;
            });
        return retString;
    }
}
