import { NextPage } from "next";
import React from "react";
import { SmiteGod } from "../../models";
import { SmiteGodsService } from "../../services/smite/smiteGods.service";

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
  const gods: SmiteGod[] = await SmiteGodsService.getGods();
  return {
    props: {
      gods,
    },
  };
}
