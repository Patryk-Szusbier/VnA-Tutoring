import { Suspense, lazy, useState } from "react";

// Lazy loading komponentów
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
import Home from "./components/Home/Home";
const Footer = lazy(() => import("./components/Footer/Footer"));
const TermsModal = lazy(() => import("./components/Home/TermsModal"));

function App() {
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  return (
    <div className="min-h-screen scroll-smooth">
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      <Home />
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer onModalOpen={setModalType} />
      </Suspense>
      <Suspense fallback={<div>Loading modal...</div>}>
        {modalType !== null && (
          <TermsModal
            isOpen={true}
            type={modalType}
            onClose={() => setModalType(null)}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
