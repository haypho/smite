import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import Select from "../components/select";
import { BASE_URL } from "../config";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { getGods } from "../api/smite/getGods";
import type { SmiteGod } from "../api/smite/types";

interface CardData {
  smiteGod: SmiteGod;
  isFlipped: boolean;
  selectedRole: string;
}

export interface HomeProps {
  smiteGods: SmiteGod[];
  roles: string[];
}

const Home: NextPage<HomeProps> = ({ smiteGods, roles }) => {
  const cardCount: number = 5;
  const defaultCardData: CardData[] = [];
  for (let i = 0; i < cardCount; i++) {
    defaultCardData.push({
      smiteGod: smiteGods[i],
      isFlipped: false,
      selectedRole: roles[0],
    });
  }
  const [cardData, setCardData] = useState<CardData[]>(defaultCardData);

  const lastSmiteGodNames: string[] = cardData.map(
    (data: CardData) => data.smiteGod.Name,
  );

  const getAvailableSmiteGodIndicesByRole = (
    role: string,
    excludedNames?: string[],
  ): number[] =>
    smiteGods.reduce(
      (list: number[], smiteGod: SmiteGod, smiteGodIndex: number) => {
        const isValidRole: boolean =
          role === "Any" || smiteGod.Roles.includes(role);
        const isNotChosen: boolean = !lastSmiteGodNames.includes(smiteGod.Name);
        const isNotExcluded: boolean = !excludedNames?.includes(smiteGod.Name);
        if (isValidRole && isNotChosen && isNotExcluded) {
          list.push(smiteGodIndex);
        }
        return list;
      },
      [],
    );

  const getRandomSmiteGodFrom = (available: number[]): number => {
    const index: number = Math.floor(Math.random() * available.length);
    return available[index];
  };

  const randomize = (cardIndex: number, newRole?: string) => {
    const role: string = newRole ?? cardData[cardIndex].selectedRole;
    const available: number[] = getAvailableSmiteGodIndicesByRole(role);
    const smiteGodIndex: number = getRandomSmiteGodFrom(available);
    setCardData(
      cardData.map((data: CardData, index: number) =>
        index === cardIndex
          ? {
            isFlipped: false,
            smiteGod: smiteGods[smiteGodIndex],
            selectedRole: role,
          }
          : data,
      ),
    );
  };

  const randomizeAll = () => {
    const newCardData: CardData[] = [];
    for (let i = 0; i < cardData.length; i++) {
      const role: string = cardData[i].selectedRole;
      const excludedNames: string[] = newCardData.map(
        (data: CardData) => data.smiteGod.Name,
      );
      const available: number[] = getAvailableSmiteGodIndicesByRole(
        role,
        excludedNames,
      );
      const smiteGodIndex: number = getRandomSmiteGodFrom(available);
      newCardData.push({
        isFlipped: false,
        selectedRole: role,
        smiteGod: smiteGods[smiteGodIndex],
      });
    }
    setCardData(newCardData);
  };

  const onChangeRole = (cardIndex: number) => (selectedRole: string) =>
    randomize(cardIndex, selectedRole);

  const flip = (cardIndex: number) => () =>
    setCardData(
      cardData.map((data: CardData, index: number) =>
        index === cardIndex ? { ...data, isFlipped: true } : data,
      ),
    );

  return (
    <Layout>
      <Head>
        <title>Smite God Randomizer</title>
        <meta name="description" content="Random Smite Gods" />
        <meta
          name="google-site-verification"
          content="5n2Yycpl5i4z-4FFdBKeun_z9Fpsw9w6Vu-6pvyp3Rg"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href={`${BASE_URL}/favicon.ico`} />
      </Head>
      <div className={styles.cards}>
        {cardData.map(
          (
            { smiteGod, isFlipped, selectedRole }: CardData,
            cardIndex: number,
          ) => {
            const { Name, godCard_URL, Title, Pantheon }: SmiteGod = smiteGod;
            return (
              <div className={styles.cardColumn} key={`${Name}-${cardIndex}`}>
                <Card flipped={isFlipped} onClick={flip(cardIndex)}>
                  <Card.Front>
                    <img
                      className={styles.image}
                      src={`${BASE_URL}/hexagons.svg`}
                      alt="Hexagon Pattern SVG"
                      draggable={false}
                    />
                  </Card.Front>
                  <Card.Back>
                    <Card.Background imageURL={godCard_URL}>
                      <div className={styles.content}>
                        <h2>{Name}</h2>
                        <p>{Title}</p>
                        <p>{Pantheon}</p>
                      </div>
                    </Card.Background>
                  </Card.Back>
                </Card>
                <Select
                  options={roles}
                  defaultValue={selectedRole}
                  onChange={onChangeRole(cardIndex)}
                />
              </div>
            );
          },
        )}
      </div>
      <div className={styles.random}>
        <button type="button" onClick={randomizeAll}>
          <FontAwesomeIcon icon={faRandom} className={styles.icon} />
        </button>
      </div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const smiteGods: SmiteGod[] = await getGods();
  const roles: string[] = smiteGods.reduce(
    (availableRoles: string[], god: SmiteGod) => {
      god.Roles.split(",").forEach((role: string) => {
        if (role && !availableRoles.includes(role)) {
          availableRoles.push(role);
        }
      });
      return availableRoles;
    },
    ["Any"],
  );

  return {
    props: {
      smiteGods,
      roles,
    },
  };
}
