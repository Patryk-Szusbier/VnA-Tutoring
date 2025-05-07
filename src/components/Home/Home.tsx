import React from "react";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Offert from "./Offert";

function Home() {
  return (
    <main className="flex-grow ">
      <Hero />
      <AboutMe />
      <Offert />
    </main>
  );
}

export default Home;
