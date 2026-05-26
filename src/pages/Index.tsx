import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Letters from "@/components/Letters";
import Map from "@/components/Map";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Promo />
      <Letters />
      <Map />
      <Footer />
    </main>
  );
};

export default Index;