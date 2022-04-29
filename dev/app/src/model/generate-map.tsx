import mapboxgl, {Map, Marker} from 'mapbox-gl';
import axios from "axios";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg';


interface coordinate {
    lng : Number,
    lat : Number,
}

export class streetMap {
    private readonly _map: Map;
    private readonly _mapContainer: string;

    private readonly _markerColors = ["#AE3C60", "#DF473C", "#F3C33C", "#255E79", "#267778", "#82b4bb"];
    private _markers = new Array<Marker>();

    constructor(mapType: string, mapContainer: string) {

        this._mapContainer = mapContainer;

        this._map = new mapboxgl.Map({
            container: this._mapContainer,
            style: mapType,
            center: [30, 30],
            zoom: 12
        });
    }

    public generateMarkers(poolers : Number) {

        for (let i = 0; i < poolers; i++) {
            if (this._markers[i]) return;
            this._markers.push(new mapboxgl.Marker({
                color: this._markerColors[i],
                draggable: true,
            })
                .setLngLat([30, 30])
                .addTo(this._map))
        }

    }

    public getRoute(coordinates : Array<coordinate>) {
        let time = 10;
        const coords = new Array<Array<coordinate>>()

        for (let i = 0; i < coordinates.length; i++) {
            coords.push([]);
            axios.get("https://api.mapbox.com/isochrone/v1/mapbox/cycling/" +
                coordinates[i].lng + "," + coordinates[i].lat +
                "?contours_minutes=" + time +
                "&polygons=true" +
                "&denoise=1" +
                "&access_token=" + mapboxgl.accessToken)
                .then((response: any) => {
                    response.data.features[0].geometry.coordinates[0].forEach((c:any) => {
                        coords[i].push({lng:c[0],lat:c[1]})
                    })
                })
        }

        console.log(coords);

    }

    private commonPoint() {

    }
}