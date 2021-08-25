import { NextPage } from "next";
import React from "react";
import { SmiteGod } from "../../models";
import { SmiteService } from "../../services/smite.service";

export interface GodListPageProps {
  gods: SmiteGod[];
}

const GodListPage: NextPage<GodListPageProps> = ({gods}) => (
  <div>
    {gods.map((god: SmiteGod) => (
        <span key={god.name}>{god.name}</span>
    ))}
  </div>
);

export default GodListPage;

export async function getStaticProps() {
  const gods: SmiteGod[] = SmiteService.getGods();
  return {
    props: {
      gods,
    },
  };
}
