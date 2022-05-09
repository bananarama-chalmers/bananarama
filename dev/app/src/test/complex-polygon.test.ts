import { Coordinate } from '../components/PoolWizard';
import {ComplexPolygon} from "../model/complex-polygon";

test("dummy test for isPointInside", () => {
  let poly = new ComplexPolygon();
  expect(poly.isPointInside({lat: 1337, lng: 1337} as Coordinate)).toBe(false);
});

export {}