import Pool from "../components/routing/Pool";
import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function PoolPage() {
  let query = useQuery();
  return <Pool name={query.get("name")} />;
}
