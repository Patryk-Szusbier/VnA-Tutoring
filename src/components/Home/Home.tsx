import React from "react";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Offert from "./Offert";

import AnimatedSeparator from "../utils/Separator";
import Work from "./Work";

function Home() {
  return (
    <main className="flex-grow ">
      <Hero />
      <AboutMe />
      <Offert />
      <AnimatedSeparator />
      <Work />
      <AnimatedSeparator />
    </main>
  );
}

export default Home;
