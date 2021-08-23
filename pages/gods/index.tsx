import { NextPage } from "next";
import React from "react";
import { BASE_URL } from "../../config";
import { SmiteGod } from "../../models";

export interface GodListPageProps {
  gods: SmiteGod[];
}

const GodListPage: NextPage<GodListPageProps> = ({gods}) => (
  <div>
    {gods.map((god: SmiteGod) => (
        <span key={god.Name}>{god.Name}</span>
    ))}
  </div>
);

export default GodListPage;

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/api/smite/gods`);
  const gods = await res.json();
  return {
    props: {
      gods,
    },
  };
}
