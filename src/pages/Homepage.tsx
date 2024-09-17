import { lazy, Suspense } from "react";

const TextParallaxContentExample = lazy(
  () => import("../components/home/TextParallaxContentExample")
);

const Homepage = () => {
  return (
    <div className="bg-backgroundlight dark:bg-backgrounddark">
      <Suspense fallback={<div>Loading...</div>}>
        <TextParallaxContentExample />
      </Suspense>
    </div>
  );
};

export default Homepage;
