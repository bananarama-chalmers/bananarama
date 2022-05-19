import mapboxgl, { Map, Marker } from "mapbox-gl";
import axios from "axios";
import { ComplexPolygon } from "./complex-polygon";
import { Coordinate, Pooler } from "../types/types";

export class StreetMap {
    private readonly _map: Map;
    private readonly _mapContainer: string;
    private _startLocation: Coordinate;

    private _markers: Array<Marker> = new Array<Marker>();
    private _middleMarker: Marker | null = null;

    constructor(
        startLocation: Coordinate,
        mapType: string,
        mapContainer: string
    ) {
        this._startLocation = startLocation;
        this._mapContainer = mapContainer;
        this._map = new mapboxgl.Map({
            container: this._mapContainer,
            style: mapType,
            center: [this._startLocation.lng, this._startLocation.lat],
            zoom: 12,
        });
    }

    public generateMarkers(poolers: Array<Pooler>): void {
        if (poolers.length > 0) {
            this._markers.forEach((marker: Marker) => {
                marker.remove();
            });
            poolers.forEach((pooler: Pooler) => {
                this._markers.push(
                    new mapboxgl.Marker({
                        color: pooler.color,
                        draggable: false,
                    })
                        .setLngLat([pooler.coords.lng, pooler.coords.lat])
                        .addTo(this._map)
                );
            });
        }
    }

    public changeMapStyle(style: string): void {
        this._map.setStyle("mapbox://styles/mapbox/" + style);
    }

    public async getRoute(poolers: Array<Pooler>, destination: Coordinate): Promise<void> {
        const travelAreas = new Array<ComplexPolygon>();
        const travelTypes = ["driving", "walking", "cycling", "driving"];


        let found: boolean | undefined = false;
        for (let minutes: number = 10; minutes < 60 && !found; minutes += 10) {
            for (let i: number = 0; i < poolers.length; i++) {
                travelAreas[i] = new ComplexPolygon();
                found = await axios
                    .get(
                        "https://api.mapbox.com/isochrone/v1/mapbox/" +
                        travelTypes[poolers[i].travelType] +
                        "/" +
                        poolers[i].coords.lng +
                        "," +
                        poolers[i].coords.lat +
                        "?contours_minutes=" +
                        minutes +
                        "&polygons=true" +
                        "&denoise=1" +
                        "&access_token=" +
                        mapboxgl.accessToken
                    )
                    .then((response: any) => {
                        response.data.features[0].geometry.coordinates[0].forEach(
                            (c: any) => {
                                travelAreas[i]
                                    .getCorners()
                                    .push({ lng: c[0], lat: c[1] });
                            }
                        );
                        if (i + 1 === poolers.length) {
                            const meetingPoint: Coordinate =
                                this.getMeetingPoint(travelAreas, poolers);

                            console.log(meetingPoint);
                            if (meetingPoint.lng !== -1 && meetingPoint.lat !== -1) {
                                this.drawDestinationRoute(
                                    meetingPoint,
                                    destination,
                                    "driving"
                                );
                                this.drawMeetingpointRoutes(
                                    poolers,
                                    meetingPoint
                                );
                                return true;
                            }
                        }
                    });
            }
        }
    }

    private getMeetingPoint(
        travelAreas: Array<ComplexPolygon>,
        poolers: Array<Pooler>
    ): Coordinate {
        let intersectedTravelArea: ComplexPolygon;
        let middle: Coordinate;

        intersectedTravelArea = travelAreas[0].getIntersectionOfPolygons(
            travelAreas[1]
        );
        middle = this.getOptimalMiddlePoint(
            poolers[0].coords,
            poolers[1].coords,
            intersectedTravelArea
        );

        for (let i = 2; i < poolers.length; i++) {
            let newIntersectedTravelArea =
                intersectedTravelArea.getIntersectionOfPolygons(travelAreas[i]);

            middle = this.getOptimalMiddlePoint(
                middle,
                poolers[i].coords,
                newIntersectedTravelArea
            );
            intersectedTravelArea = newIntersectedTravelArea;
        }

        return middle;
    }

    private getOptimalMiddlePoint(
        c1: Coordinate,
        c2: Coordinate,
        intersectedTravelArea: ComplexPolygon
    ): Coordinate {
        let middle: Coordinate;

        // Gets average between points if both are in the intersected area
        if (
            intersectedTravelArea.isPointInside(c1) ||
            intersectedTravelArea.isPointInside(c2)
        )
            middle = {
                lng: (c1.lng + c2.lng) / 2,
                lat: (c1.lat + c2.lat) / 2,
            };
        // Gets middle of intersected area if points are outside intersected area
        else if (intersectedTravelArea.getCorners().length > 0)
            middle = {
                lng:
                    (intersectedTravelArea.getCorners()[0].lng +
                        intersectedTravelArea.getCorners()[
                            intersectedTravelArea.getCorners().length - 1
                        ].lng) /
                    2,
                lat:
                    (intersectedTravelArea.getCorners()[0].lat +
                        intersectedTravelArea.getCorners()[
                            intersectedTravelArea.getCorners().length - 1
                        ].lat) /
                    2,
            };
        else return { lng: -1, lat: -1 };


        return middle;
    }

    private drawDestinationRoute(
        meetingPoint: Coordinate,
        destination: Coordinate,
        travelType: string
    ): void {
        axios
            .get(
                "https://api.mapbox.com/directions/v5/mapbox/" +
                    travelType +
                    "/" +
                    meetingPoint.lng +
                    "%2C" +
                    meetingPoint.lat +
                    "%3B" +
                    destination.lng +
                    "%2C" +
                    destination.lat +
                    "?alternatives=" +
                    false +
                    "&geometries=geojson" +
                    "&overview=full" +
                    "&steps=" +
                    false +
                    "&access_token=" +
                    mapboxgl.accessToken
            )
            .then((response: any) => {
                if (this._map.getSource("route")) {
                    this._map.removeLayer("route");
                    this._map.removeSource("route");
                }

                this._map.addSource("route", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates:
                                response.data.routes[0].geometry.coordinates,
                        },
                    },
                });
                this._map.addLayer({
                    id: "route",
                    type: "line",
                    source: "route",
                    layout: {
                        "line-join": "round",
                        "line-cap": "square",
                    },
                    paint: {
                        "line-color": "#000000",
                        "line-width": 6,
                    },
                });
            });

        this._markers.push(
            new mapboxgl.Marker({
                color: "#000000",
                draggable: false,
            })
                .setLngLat([destination.lng, destination.lat])
                .addTo(this._map)
        );

    }

    private drawMeetingpointRoutes(
        poolers: Array<Pooler>,
        destination: Coordinate
    ): void {
        const travelTypes = ["driving", "walking", "cycling", "driving"];

        if (this._middleMarker) this._middleMarker.remove();

        this._middleMarker = new mapboxgl.Marker({
            color: "#000000",
            draggable: false,
        })
            .setLngLat([destination.lng, destination.lat])
            .addTo(this._map);

        for (let j: number = 0; j < poolers.length + 1; j++) {
            if (this._map.getSource("route" + j)) {
                this._map.removeLayer("route" + j);
                this._map.removeSource("route" + j);
            }
        }

        for (let i = 0; i < poolers.length; i++) {
            axios
                .get(
                    "https://api.mapbox.com/directions/v5/mapbox/" +
                        travelTypes[poolers[i].travelType] +
                        "/" +
                        poolers[i].coords.lng +
                        "%2C" +
                        poolers[i].coords.lat +
                        "%3B" +
                        destination.lng +
                        "%2C" +
                        destination.lat +
                        "?alternatives=" +
                        false +
                        "&geometries=geojson" +
                        "&overview=full" +
                        "&steps=" +
                        false +
                        "&access_token=" +
                        mapboxgl.accessToken
                )
                .then((response: any) => {

                    this._map.addSource("route" + i, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "LineString",
                                coordinates:
                                    response.data.routes[0].geometry
                                        .coordinates,
                            },
                        },
                    });
                    this._map.addLayer({
                        id: "route" + i,
                        type: "line",
                        source: "route" + i,
                        layout: {
                            "line-join": "round",
                            "line-cap": "square",
                        },
                        paint: {
                            "line-color": "#000000",
                            "line-width": 4,
                        },
                    });
                });
        }
    }
}
