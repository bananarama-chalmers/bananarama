import {Coordinate} from "./street-map";


export class complexPolygon {
    private _corners:Array<Coordinate> = new Array<Coordinate>();

    public getIntersectionOfPolygons(
        poly: complexPolygon,
    ): complexPolygon {
        const clippedCorners: complexPolygon = new complexPolygon();
        //Add  the corners of poly1 which are inside poly2
        for (let i = 0; i < this._corners.length; i++) {
            if (poly.isPointInside(this._corners[i]))
                clippedCorners.addCorners(new Array<Coordinate>(this._corners[i]));
        }
        //Add the corners of poly2 which are inside poly1
        for (let i = 0; i < poly.getCorners().length; i++) {
            if (this.isPointInside(poly.getCorners()[i]))
                clippedCorners.addCorners(new Array<Coordinate>(poly.getCorners()[i]));
        }

        const intersectPolygon = new complexPolygon();

        //Add  the intersection points
        for (
            let i = 0, next = 1;
            i < this._corners.length;
            i++, next = i + 1 === this._corners.length ? 0 : i + 1
        ) {
            intersectPolygon.addCorners(clippedCorners.getCorners());
            intersectPolygon.addCorners(poly.getIntersectionPoints(this._corners[i], this._corners[next]));
        }

        intersectPolygon.orderClockwise();

        return intersectPolygon;
    }

    public getCorners() {
        return this._corners;
    }

    private addCorners(
        corners: Array<Coordinate>
    ): void {
        corners.forEach((np: Coordinate) => {
            let found: boolean = false;
            this._corners.forEach((p: Coordinate) => {
                if (
                    complexPolygon.doubleEqual(p.lng, np.lng) &&
                    complexPolygon.doubleEqual(p.lat, np.lat)
                ) {
                    found = true;
                    return;
                }
            });
            if (!found) this._corners.push(np);
        });
    }

    public isPointInside(
        test: Coordinate,
    ): boolean {
        let result: boolean = false;
        for (let i:number = 0, j:number = this._corners.length - 1; i < this._corners.length; j = i++) {
            if (
                ((this._corners[i].lat > test.lat) !== (this._corners[j].lat > test.lat)) &&
                (test.lng < ((this._corners[j].lng - this._corners[i].lng) * (test.lat - this._corners[i].lat)) / (this._corners[j].lat - this._corners[i].lat) + this._corners[i].lng)
            ) {
                result = !result;
            }
        }
        return result;
    }

    private getIntersectionPoints(
        l1p1: Coordinate,
        l1p2: Coordinate,
    ): Array<Coordinate> {
        const intersectionPoints = new Array<Coordinate>();

        for (let i = 0; i < this._corners.length; i++) {
            const next: number = i + 1 === this._corners.length ? 0 : i + 1;
            const ip: Coordinate | null = complexPolygon.getIntersectionPoint(
                l1p1,
                l1p2,
                this._corners[i],
                this._corners[next]
            );
            if (ip !== null) intersectionPoints.push(ip);
        }
        return intersectionPoints;
    }

    private orderClockwise(): void{
        let mLng: number = 0, mLat: number = 0;

        this._corners.forEach((p: Coordinate) => {
            mLng += p.lng;
            mLat += p.lat;
        });

        mLng /= this._corners.length;
        mLat /= this._corners.length;

        this._corners.sort((v) => Math.atan2(v.lat - mLat, v.lng - mLng));
    }

    private static doubleEqual(d1: number, d2: number): boolean {
        return Math.abs(d1 - d2) <= 0.000000001;
    }

    private static getIntersectionPoint(
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
        if (complexPolygon.doubleEqual(det, 0)) return null; //parallel lines
        else {
            const lng = (B2 * C1 - B1 * C2) / det;
            const lat = (A1 * C2 - A2 * C1) / det;
            const online1: boolean =
                (Math.min(l1p1.lng, l1p2.lng) < lng ||
                    complexPolygon.doubleEqual(Math.min(l1p1.lng, l1p2.lng), lng)) &&
                (Math.max(l1p1.lng, l1p2.lng) > lng ||
                    complexPolygon.doubleEqual(Math.max(l1p1.lng, l1p2.lng), lng)) &&
                (Math.min(l1p1.lat, l1p2.lat) < lat ||
                    complexPolygon.doubleEqual(Math.min(l1p1.lat, l1p2.lat), lat)) &&
                (Math.max(l1p1.lat, l1p2.lat) > lat ||
                    complexPolygon.doubleEqual(Math.max(l1p1.lat, l1p2.lat), lat));
            const online2: boolean =
                (Math.min(l2p1.lng, l2p2.lng) < lng ||
                    complexPolygon.doubleEqual(Math.min(l2p1.lng, l2p2.lng), lng)) &&
                (Math.max(l2p1.lng, l2p2.lng) > lng ||
                    complexPolygon.doubleEqual(Math.max(l2p1.lng, l2p2.lng), lng)) &&
                (Math.min(l2p1.lat, l2p2.lat) < lat ||
                    complexPolygon.doubleEqual(Math.min(l2p1.lat, l2p2.lat), lat)) &&
                (Math.max(l2p1.lat, l2p2.lat) > lat ||
                    complexPolygon.doubleEqual(Math.max(l2p1.lat, l2p2.lat), lat));
            if (online1 && online2) return { lng: lng, lat: lat };
        }
        return null; //intersection is at out of at least one segment.
    }



}