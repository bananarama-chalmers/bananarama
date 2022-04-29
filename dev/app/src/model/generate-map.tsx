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

    public getRoute() {
        let time = 10;
        const coordinates = this._markers.map((m : Marker) => {return {lng:m.getLngLat().lng, lat:m.getLngLat().lat}})
        const travelAreas = new Array<Array<coordinate>>()

        for (let i = 0; i < coordinates.length; i++) {
            travelAreas.push([]);
            axios.get("https://api.mapbox.com/isochrone/v1/mapbox/cycling/" +
                coordinates[i].lng + "," + coordinates[i].lat +
                "?contours_minutes=" + time +
                "&polygons=true" +
                "&denoise=1" +
                "&access_token=" + mapboxgl.accessToken)
                .then((response: any) => {
                    response.data.features[0].geometry.coordinates[0].forEach((c:any) => {
                        travelAreas[i].push({lng:c[0],lat:c[1]})
                    })
                })
        }

        console.log(travelAreas);

    }

    private getCommonPoint(travelAreas : Array<Array<coordinate>>) {
        let tempDiff : number;
        let lowestDiff : number = this.calcCoordDiff(travelAreas[0][0], travelAreas[1][0]);
        let shortestPoints : Array<coordinate> = [travelAreas[0][0], travelAreas[1][0]];

        travelAreas[0].forEach((c1 : coordinate) => {
            travelAreas[1].forEach((c2 : coordinate) => {
                tempDiff = this.calcCoordDiff(c1,c2);
                if(lowestDiff > tempDiff) {
                    lowestDiff = tempDiff;
                    shortestPoints = [c1, c2];
                }
            })
        })

        let commonPoint = {lng: (shortestPoints[0].lng + shortestPoints[1].lng)/2,
                           lat: (shortestPoints[0].lat + shortestPoints[1].lat)/2}
        lowestDiff = this.calcCoordDiff(commonPoint, travelAreas[2][0]);
        let shortestPoint:coordinate = travelAreas[2][0];

        for (let i = 2; i < travelAreas.length; i++) {
            travelAreas[i].forEach((c:coordinate) => {
                tempDiff = this.calcCoordDiff(commonPoint,c);
                if(lowestDiff > tempDiff) {
                    lowestDiff = tempDiff;
                    shortestPoint = c;
                }
            })
            commonPoint = {lng: (commonPoint.lng + shortestPoint.lng)/2,
                           lat: (commonPoint.lat + shortestPoint.lat)/2}
        }
    }


    private calcCoordDiff(c1:coordinate, c2:coordinate) {
        return Math.abs((c1.lng - c2.lng)) + Math.abs((c1.lat - c2.lat))
    }
}