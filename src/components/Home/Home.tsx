import React from "react";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Offert from "./Offert";

import AnimatedSeparator from "../utils/Separator";
import Work from "./Work";
import ContactForm from "./ContactMe";

function Home() {
  return (
    <main className="flex-grow ">
      <Hero />
      <AboutMe />
      <Offert />
      <AnimatedSeparator />
      <Work />
      <AnimatedSeparator />
      <ContactForm />
    </main>
  );
}

export default Home;
