import { lazy } from "react";

const TextParallaxContentExample = lazy(
  () => import("../components/home/TextParallaxContentExample")
);

const Homepage = () => {
  return (
    <div className="bg-backgroundlight dark:bg-backgrounddark">
      <TextParallaxContentExample />
    </div>
  );
};

export default Homepage;
