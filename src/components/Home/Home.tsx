import { Suspense, lazy } from "react";
import Hero from "./Hero";

const AnimatedSeparator = lazy(() => import("../utils/Separator"));
const Offert = lazy(() => import("./Offert"));
const ContactForm = lazy(() => import("./ContactMe"));
const ImageTextSection = lazy(() => import("./ImageTextSection"));
import MyPhoto from "../../assets/Me.webp";
import MyWork from "../../assets/WorkSection.webp";

function Home() {
  return (
    <main className="flex-grow">
      <Hero />

      <AnimatedSeparator />
      <Suspense fallback={<div>Ładowanie sekcji…</div>}>
        <ImageTextSection
          title="O mnie"
          content="Cześć, mam na imię Vanessa i jestem korepetytorką matematyki z kilkuletnim doświadczeniem. 
        Zajęcia prowadzę wyłącznie online, dzięki czemu mogę pomagać uczniom z różnych miast. Uwielbiam zamieniać trudne zagadnienia na proste kroki: 
         tłumaczę matematykę cierpliwie i z uśmiechem. Pomagam uczniom szkół średnich (liceum i technikum) w opanowaniu 
         bieżącego materiału oraz w przygotowaniu do matury na poziomie podstawowym. 
         Wierzę, że każdy może zrozumieć matematykę - kluczem jest indywidualne podejście i wspólna nauka krok po kroku, 
         bez stresu."
          image={MyPhoto}
          imageAlt="Vanessa Heckel"
          imagePosition="left"
          id="AboutMe"
          animation="normal"
        />
        <AnimatedSeparator />
      </Suspense>
      <Suspense fallback={<div>Ładowanie sekcji…</div>}>
        <Offert />
        <AnimatedSeparator />
      </Suspense>
      <Suspense fallback={<div>Ładowanie sekcji…</div>}>
        <ImageTextSection
          title="Jak pracuję?"
          content="Na zajęciach stawiam na dobrą atmosferę i przejrzyste wyjaśnienia – chcę, aby uczniowie czuli się 
        swobodnie pytać i uczyć we własnym tempie. Zawsze zaczynamy od powtórki lub sprawdzenia bieżącego materiału, 
        a następnie systematycznie przechodzimy przez kolejne tematy krok po kroku. Wierzę, że spokojne tłumaczenie 
        nawet najtrudniejszych zagadnień pomaga zbudować pewność siebie w matematyce. 
        Dostosowuję tempo zajęć do indywidualnych potrzeb: jeśli jakiś temat sprawia Ci trudność, 
        zatrzymujemy się przy nim dłużej i szukamy prostych wyjaśnień. Korzystam z własnych,
         autorskich materiałów – przygotowuję notatki, schematy i przykładowe zadania dopasowane do Twojego poziomu. 
         Zajęcia odbywają się online (np. przez Zoom lub Skype), co pozwala na wygodne uczenie się z domu. 
         Dodatkowo możesz otrzymać nagranie lekcji i dodatkowe materiały po spotkaniu, by łatwiej utrwalić nową wiedzę."
          image={MyWork}
          imageAlt="Jak pracuję"
          imagePosition="right"
          id="HowIWork"
          animation="up"
        />
        <AnimatedSeparator />
      </Suspense>
      <Suspense fallback={<div>Ładowanie sekcji…</div>}>
        <ContactForm />
      </Suspense>
    </main>
  );
}

export default Home;
