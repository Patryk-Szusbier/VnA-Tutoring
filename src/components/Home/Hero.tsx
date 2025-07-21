import Photo from "../../assets/HeroSection.webp";

export default function Hero() {
  return (
    <section id="Home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50">
        <img
          src={Photo}
          alt="Hero background"
          className="object-cover h-full w-full blur-sm "
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <h1 className="text-text2 text-4xl md:text-6xl font-bold text-center ">
          Korepetycje z matematyki online – profesjonalna pomoc dla licealistów
          i uczniów techników
        </h1>
      </div>
    </section>
  );
}
