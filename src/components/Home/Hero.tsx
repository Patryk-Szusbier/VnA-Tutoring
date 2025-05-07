import Photo from "../../assets/Hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Tło z efektem blur */}
      <div className="absolute inset-0">
        <img
          src={Photo}
          alt="Hero background"
          className="w-full h-full object-cover filter blur-sm scale-105"
        />
        {/* Półprzezroczysty ciemny overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Zawartość na wierzchu */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <h1 className="text-text2 text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
          Korepetycje z matematyki online – profesjonalna pomoc dla licealistów
          i uczniów techników
        </h1>
      </div>
    </section>
  );
}
