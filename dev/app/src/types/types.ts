export enum Travel {
    Car,
    Foot,
    Bike,
    Bus,
}

export type Coordinate = {
    lat: number;
    lng: number;
};

export type Pooler = {
    name: string;
    coords: Coordinate;
    street: string;
    travelType: Travel;
    color: Color;
    poolElement: JSX.Element;
};

export type Color = {
    hex: string;
    hue: number;
}