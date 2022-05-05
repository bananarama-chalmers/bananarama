import mapboxgl, { Map, Marker } from "mapbox-gl";
import axios from "axios";

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

        const travelAreas = new Array<Array<Coordinate>>();

        for (let i = 0; i < coordinates.length; i++) {
            travelAreas[i] = [];
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
                            travelAreas[i].push({ lng: c[0], lat: c[1] });
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
        travelAreas: Array<Array<Coordinate>>,
        poolerCoordinates: Array<Coordinate>
    ): Coordinate {
        let intersectedTravelArea: Array<Coordinate>;
        let middle: Coordinate;

        intersectedTravelArea = this.getIntersectionOfPolygons(
            travelAreas[0],
            travelAreas[1]
        );
        middle = this.getOptimalMiddlePoint(
            poolerCoordinates[0],
            poolerCoordinates[1],
            intersectedTravelArea
        );

        for (let i = 2; i < poolerCoordinates.length; i++) {
            let newIntersectedTravelArea = this.getIntersectionOfPolygons(
                intersectedTravelArea,
                travelAreas[i]
            );
            middle = this.getOptimalMiddlePoint(
                middle,
                poolerCoordinates[i],
                newIntersectedTravelArea
            );
            intersectedTravelArea = newIntersectedTravelArea;
        }

        return middle;
    }

    private getIntersectionPoint(
        l1p1: Coordinate,
        l1p2: Coordinate,
        l2p1: Coordinate,
        l2p2: Coordinate
    ): Coordinate | null {
        const A1 = l1p2.lat - l1p1.lat;
        const B1 = l1p1.lng - l1p2.lng;
        const C1 = A1 * l1p1.lng + B1 * l1p1.lat;
        const A2 = l2p2.lat - l2p1.lat;
        const B2 = l2p1.lng - l2p2.lng;
        const C2 = A2 * l2p1.lng + B2 * l2p1.lat;
        //lines are parallel
        const det = A1 * B2 - A2 * B1;
        if (this.coordEqual(det, 0)) return null; //parallel lines
        else {
            const lng = (B2 * C1 - B1 * C2) / det;
            const lat = (A1 * C2 - A2 * C1) / det;
            const online1: boolean =
                (Math.min(l1p1.lng, l1p2.lng) < lng ||
                    this.coordEqual(Math.min(l1p1.lng, l1p2.lng), lng)) &&
                (Math.max(l1p1.lng, l1p2.lng) > lng ||
                    this.coordEqual(Math.max(l1p1.lng, l1p2.lng), lng)) &&
                (Math.min(l1p1.lat, l1p2.lat) < lat ||
                    this.coordEqual(Math.min(l1p1.lat, l1p2.lat), lat)) &&
                (Math.max(l1p1.lat, l1p2.lat) > lat ||
                    this.coordEqual(Math.max(l1p1.lat, l1p2.lat), lat));
            const online2: boolean =
                (Math.min(l2p1.lng, l2p2.lng) < lng ||
                    this.coordEqual(Math.min(l2p1.lng, l2p2.lng), lng)) &&
                (Math.max(l2p1.lng, l2p2.lng) > lng ||
                    this.coordEqual(Math.max(l2p1.lng, l2p2.lng), lng)) &&
                (Math.min(l2p1.lat, l2p2.lat) < lat ||
                    this.coordEqual(Math.min(l2p1.lat, l2p2.lat), lat)) &&
                (Math.max(l2p1.lat, l2p2.lat) > lat ||
                    this.coordEqual(Math.max(l2p1.lat, l2p2.lat), lat));
            if (online1 && online2) return { lng: lng, lat: lat };
        }
        return null; //intersection is at out of at least one segment.
    }

    private isPointInsidePoly(
        test: Coordinate,
        poly: Array<Coordinate>
    ): boolean {
        let i: number;
        let j: number;
        let result: boolean = false;
        for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            if (
                poly[i].lat > test.lat !== poly[j].lat > test.lat &&
                test.lng <
                    ((poly[j].lng - poly[i].lng) * (test.lat - poly[i].lat)) /
                        (poly[j].lat - poly[i].lat) +
                        poly[i].lng
            ) {
                result = !result;
            }
        }
        return result;
    }

    private getIntersectionPoints(
        l1p1: Coordinate,
        l1p2: Coordinate,
        poly: Array<Coordinate>
    ): Array<Coordinate> {
        const intersectionPoints = new Array<Coordinate>();

        for (let i = 0; i < poly.length; i++) {
            const next: number = i + 1 === poly.length ? 0 : i + 1;
            const ip: Coordinate | null = this.getIntersectionPoint(
                l1p1,
                l1p2,
                poly[i],
                poly[next]
            );
            if (ip !== null) intersectionPoints.push(ip);
        }
        return intersectionPoints;
    }

    private addPoints(
        pool: Array<Coordinate>,
        newPoints: Array<Coordinate>
    ): void {
        newPoints.forEach((np: Coordinate) => {
            let found: boolean = false;
            pool.forEach((p: Coordinate) => {
                if (
                    this.coordEqual(p.lng, np.lng) &&
                    this.coordEqual(p.lat, np.lat)
                ) {
                    found = true;
                    return;
                }
            });
            if (!found) pool.push(np);
        });
    }

    private orderClockwise(points: Array<Coordinate>): Array<Coordinate> {
        let mLng: number = 0;
        let mLat: number = 0;
        points.forEach((p: Coordinate) => {
            mLng += p.lng;
            mLat += p.lat;
        });
        mLng /= points.length;
        mLat /= points.length;
        return points.sort((v) => Math.atan2(v.lat - mLat, v.lng - mLng));
    }

    private getIntersectionOfPolygons(
        poly1: Array<Coordinate>,
        poly2: Array<Coordinate>
    ): Array<Coordinate> {
        const clippedCorners: Array<Coordinate> = new Array<Coordinate>();
        //Add  the corners of poly1 which are inside poly2
        for (let i = 0; i < poly1.length; i++) {
            if (this.isPointInsidePoly(poly1[i], poly2))
                this.addPoints(clippedCorners, new Array<Coordinate>(poly1[i]));
        }
        //Add the corners of poly2 which are inside poly1
        for (let i = 0; i < poly2.length; i++) {
            if (this.isPointInsidePoly(poly2[i], poly1))
                this.addPoints(clippedCorners, new Array<Coordinate>(poly2[i]));
        }
        //Add  the intersection points
        for (
            let i = 0, next = 1;
            i < poly1.length;
            i++, next = i + 1 === poly1.length ? 0 : i + 1
        ) {
            this.addPoints(
                clippedCorners,
                this.getIntersectionPoints(poly1[i], poly1[next], poly2)
            );
        }

        return this.orderClockwise(clippedCorners);
    }

    private getOptimalMiddlePoint(
        c1: Coordinate,
        c2: Coordinate,
        intersectedTravelArea: Array<Coordinate>
    ): Coordinate {
        let middle: Coordinate;

        // Gets average between points if both are in the intersected area
        if (
            this.isPointInsidePoly(c1, intersectedTravelArea) ||
            this.isPointInsidePoly(c2, intersectedTravelArea)
        )
            middle = {
                lng: (c1.lng + c2.lng) / 2,
                lat: (c1.lat + c2.lat) / 2,
            };
        // Gets middle of intersected area if points are outside intersected area
        else
            middle = {
                lng:
                    (intersectedTravelArea[0].lng +
                        intersectedTravelArea[intersectedTravelArea.length - 1]
                            .lng) /
                    2,
                lat:
                    (intersectedTravelArea[0].lat +
                        intersectedTravelArea[intersectedTravelArea.length - 1]
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

    private coordEqual(d1: number, d2: number): boolean {
        return Math.abs(d1 - d2) <= 0.000000001;
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
