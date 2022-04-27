import Pool from "../components/routing/Pool";
import React from "react";
import { useSearchParams } from "react-router-dom";


export default function PoolPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const poolProps = {
    lat: searchParams.get("lat"),
    long: searchParams.get("long")
  }

  return <Pool {...poolProps} />;
}
