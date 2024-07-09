import React from "react";
import Layout from "../components/test/Layout";
import DarkGridHero from "../components/DarkGridHero";
import DoubleScrollingLogos from "../components/DoubleScrollingLogos";
import TextParallaxContentExample from "../components/TextParallaxContentExample";
import "../scss/pages/Home.scss";

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <div className="section">
          <h1>Home Page</h1>
          {/* <DarkGridHero /> */}
        </div>

        <div className="section">
          <TextParallaxContentExample />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
