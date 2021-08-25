import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { SmiteGod } from "../../models";
import { SmiteGodsService } from "../../services/smite/smiteGods.service";

export interface GodPageProps {
  god?: SmiteGod;
}

const GodPage: NextPage<GodPageProps> = ({god}) => (
  <div>
    <div>{god?.Name}</div>
  </div>
);

export default GodPage;

export const getStaticProps: GetStaticProps<GodPageProps> = async (context: GetStaticPropsContext) => {
  const gods: SmiteGod[] = await SmiteGodsService.getGods();
  const god: SmiteGod | undefined = gods.find((smiteGod: SmiteGod) => smiteGod.Name.toLowerCase() === context.params?.name);
  return {
    props: {
      god,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const gods: SmiteGod[] = await SmiteGodsService.getGods();
  const paths = gods.map((god: SmiteGod) => ({
    params: {
      name: god.Name.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
