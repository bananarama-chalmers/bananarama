import mapboxgl, { Map, Marker } from "mapbox-gl";
import axios from "axios";
import {complexPolygon} from "./complex-polygon";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

export interface Coordinate {
    lng: number;
    lat: number;
}

export class streetMap {
    private readonly _map: Map;
    private readonly _mapContainer: string;
    private _startLocation: Coordinate;

    //TODO: be abstracted
    private readonly _markerColors = [
        "#AE3C60",
        "#DF473C",
        "#F3C33C",
        "#255E79",
        "#267778",
        "#82b4bb",
    ];

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

    public generateMarkers(poolers: Number) {
        for (let i = 0; i < poolers; i++) {
            if (this._markers[i]) return;
            this._markers.push(
                new mapboxgl.Marker({
                    color: this._markerColors[i],
                    draggable: true,
                })
                    .setLngLat([
                        this._startLocation.lng,
                        this._startLocation.lat,
                    ])
                    .addTo(this._map)
            );
        }
    }

    public getRoute(destination: Coordinate) {
        let minutes = 10;

        const coordinates = this._markers.map((m: Marker) => {
            return { lng: m.getLngLat().lng, lat: m.getLngLat().lat };
        });

        const travelAreas = new Array<complexPolygon>();

        for (let i = 0; i < coordinates.length; i++) {
            travelAreas[i] = new complexPolygon();
            axios
                .get(
                    "https://api.mapbox.com/isochrone/v1/mapbox/cycling/" +
                        coordinates[i].lng +
                        "," +
                        coordinates[i].lat +
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
                            travelAreas[i].getCorners().push({ lng: c[0], lat: c[1] });
                        }
                    );
                    if (i + 1 === coordinates.length) {
                        this.drawDestinationRoute(
                            this.getMeetingPoint(travelAreas, coordinates),
                            destination,
                            "driving"
                        );
                        this.drawMeetingpointRoutes(
                            coordinates,
                            [
                                "cycling",
                                "cycling",
                                "cycling",
                                "cycling",
                                "cycling",
                                "cycling",
                            ],
                            this.getMeetingPoint(travelAreas, coordinates)
                        );
                    }
                });
        }
    }

    public getMeetingPoint(
        travelAreas: Array<complexPolygon>,
        poolerCoordinates: Array<Coordinate>
    ): Coordinate {
        let intersectedTravelArea: complexPolygon;
        let middle: Coordinate;

        intersectedTravelArea = travelAreas[0].getIntersectionOfPolygons(travelAreas[1]);
        middle = this.getOptimalMiddlePoint(
            poolerCoordinates[0],
            poolerCoordinates[1],
            intersectedTravelArea
        );

        for (let i = 2; i < poolerCoordinates.length; i++) {
            let newIntersectedTravelArea = intersectedTravelArea.getIntersectionOfPolygons(travelAreas[i]);

            middle = this.getOptimalMiddlePoint(
                middle,
                poolerCoordinates[i],
                newIntersectedTravelArea
            );
            intersectedTravelArea = newIntersectedTravelArea;
        }

        return middle;
    }


    private getOptimalMiddlePoint(
        c1: Coordinate,
        c2: Coordinate,
        intersectedTravelArea: complexPolygon
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
        else
            middle = {
                lng:
                    (intersectedTravelArea.getCorners()[0].lng +
                        intersectedTravelArea.getCorners()[intersectedTravelArea.getCorners().length - 1]
                            .lng) /
                    2,
                lat:
                    (intersectedTravelArea.getCorners()[0].lat +
                        intersectedTravelArea.getCorners()[intersectedTravelArea.getCorners().length - 1]
                            .lat) /
                    2,
            };

        if (this._middleMarker) this._middleMarker.remove();

        this._middleMarker = new mapboxgl.Marker({
            color: "#000000",
            draggable: false,
        })
            .setLngLat([middle.lng, middle.lat])
            .addTo(this._map);

        return middle;
    }

    public drawDestinationRoute(
        meetingPoint: Coordinate,
        destination: Coordinate,
        travelType: string
    ) {
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
    }

    public drawMeetingpointRoutes(
        poolerCoordinates: Array<Coordinate>,
        poolerTravelTypes: Array<string>,
        destination: Coordinate
    ) {
        for (let i = 0; i < poolerCoordinates.length; i++) {
            axios
                .get(
                    "https://api.mapbox.com/directions/v5/mapbox/" +
                        poolerTravelTypes[i] +
                        "/" +
                        poolerCoordinates[i].lng +
                        "%2C" +
                        poolerCoordinates[i].lat +
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
                    if (this._map.getSource("route" + i)) {
                        this._map.removeLayer("route" + i);
                        this._map.removeSource("route" + i);
                    }

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
                            "line-color": this._markerColors[i],
                            "line-width": 4,
                        },
                    });
                });
        }
    }
}
