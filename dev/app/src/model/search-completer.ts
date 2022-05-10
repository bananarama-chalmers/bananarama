import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

//input partial searchparameter as a string
//return a promise with and array of suggested adresses
//see geo-coding forwardGeocoding for how to use the response
export class searchCompleter{
    public async suggestions(partialSearch:string):Promise<Array<string>>{
        //return string
        let returnString: Array<string> = [];
        //encode the adress
        let encodedAdress = encodeURI(partialSearch);

        const promise = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            encodedAdress +
            '.json?proximity=ip&access_token=' +
            mapboxgl.accessToken).then((response:any) => {
                if(response.data.features.length < 1){
                    returnString.push("Adress not found");
                }else{
                    for(let i = 0; i < 5; i++){
                        returnString.push(response.data.features[i].place_name);
                    }
                }

        });
        return returnString;
    }
}