import { Suspense, lazy, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
const Footer = lazy(() => import("./components/Footer/Footer"));
const TermsModal = lazy(() => import("./components/Home/TermsModal"));

function App() {
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <Home />
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer onModalOpen={setModalType} />
      </Suspense>
      <Suspense fallback={null}>
        {modalType !== null && (
          <TermsModal
            type={modalType}
            onClose={() => setModalType(null)}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
