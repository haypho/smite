import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { BASE_URL } from "../../config";
import { SmiteGod } from "../../models";

export interface GodPageProps {
  god: SmiteGod;
}

const GodPage: NextPage<GodPageProps> = ({god}) => (
  <div>
    <div>{god.Name}</div>
  </div>
);

export default GodPage;

export const getStaticProps: GetStaticProps<GodPageProps> = async (context: GetStaticPropsContext) => {
  const res = await fetch(`${BASE_URL}/api/smite/gods`);
  const gods = await res.json();
  const god = gods.find((smiteGod: SmiteGod) => smiteGod.Name.toLowerCase() === context.params?.name);
  return {
    props: {
      god,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}/api/smite/gods`);
  const gods = await res.json();
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
