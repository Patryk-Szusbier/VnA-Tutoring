import { Suspense, lazy, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Offer from "./components/sections/Offer";
import Process from "./components/sections/Process";
import About from "./components/sections/About";
import Pricing from "./components/sections/Pricing";
import Faq from "./components/sections/Faq";
import Contact from "./components/sections/Contact";

const TermsModal = lazy(() => import("./components/legal/TermsModal"));

function App() {
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  return (
    <>
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-dark"
      >
        Przejdź do treści
      </a>
      <Navbar />
      <main id="tresc">
        <Hero />
        <Offer />
        <Process />
        <About />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer onModalOpen={setModalType} />
      <Suspense fallback={null}>
        {modalType !== null && (
          <TermsModal type={modalType} onClose={() => setModalType(null)} />
        )}
      </Suspense>
    </>
  );
}

export default App;
