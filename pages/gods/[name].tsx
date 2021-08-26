import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { SmiteGod } from "../../models";
import { SmiteService } from "../../services/smite.service";

export interface GodPageProps {
  god?: SmiteGod;
}

const GodPage: NextPage<GodPageProps> = ({god}) => (
  <div>
    <div>{god?.name}</div>
  </div>
);

export default GodPage;

const formatGodName = (name: string): string => name.split(" ").join("-").toLowerCase();

export const getStaticProps: GetStaticProps<GodPageProps> = async (context: GetStaticPropsContext) => {
  const god: SmiteGod | undefined = SmiteService.getGods().find((smiteGod: SmiteGod) =>
    formatGodName(smiteGod.name) === context.params?.name
  );
  return {
    props: {
      god,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SmiteService.getGods().map((god: SmiteGod) => ({
    params: {
      name: formatGodName(god.name),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
