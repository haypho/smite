import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { getGods } from "../api/smite/getGods";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
  DehydratedState,
} from "@tanstack/react-query";
import {
  SMITE_SESSION_TTL_IN_MILLIS,
  SmiteMethod,
} from "../api/smite/smite.constants";
import { createSession } from "../api/smite/createSession";
import { Provider } from "react-redux";
import { store } from "../stores/store";
import styled from "@emotion/styled";

const MinHeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export interface HomeProps {
  dehydratedState: DehydratedState;
}

const Home: NextPage<HomeProps> = ({ dehydratedState }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Provider store={store}>
          <Head>
            <title>Smite God Randomizer</title>
            <meta name="description" content="Random Smite Gods" />
            <meta
              name="google-site-verification"
              content="5n2Yycpl5i4z-4FFdBKeun_z9Fpsw9w6Vu-6pvyp3Rg"
            />
            <meta name="robots" content="index,follow" />
            <link rel="icon" href="favicon.ico" />
          </Head>
          <MinHeightWrapper>
            <Main />
            <Footer />
          </MinHeightWrapper>
          <ReactQueryDevtools />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default Home;

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [SmiteMethod.CREATE_SESSION],
    queryFn: createSession,
    staleTime: SMITE_SESSION_TTL_IN_MILLIS,
    cacheTime: SMITE_SESSION_TTL_IN_MILLIS,
  });
  await queryClient.prefetchQuery({
    queryKey: [SmiteMethod.GET_GODS],
    queryFn: () => {
      const sessionId = queryClient.getQueryData<string>([
        SmiteMethod.CREATE_SESSION,
      ]);
      if (!sessionId) throw new Error("Missing sessionId");
      return getGods(sessionId);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient, { dehydrateQueries: true }),
    },
  };
}
