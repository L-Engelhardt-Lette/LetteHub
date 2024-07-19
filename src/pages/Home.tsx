import React, { lazy, Suspense } from "react";
import Layout from "../components/test/Layout";

const TextParallaxContentExample = lazy(
  () => import("../components/home/TextParallaxContentExample")
);

const Home = () => {
  return (
    <Layout>
      <div className="bg-backgroundlight dark:bg-backgrounddark">
        <Suspense fallback={<div>Loading...</div>}>
          <TextParallaxContentExample />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Home;
