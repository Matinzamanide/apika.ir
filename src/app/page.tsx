import Brands from "@/components/Brands/Brands";
import Category from "@/components/Category/Category";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewestProduct from "@/components/NewestProduct/NewestProduct";
import PumpBrands from "@/components/PumpBrands/PumpBrands";
import PumpCategory from "@/components/PumpCategory/PumpCategory";

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <Category/>
      <PumpCategory/>
      <NewestProduct/>
      <PumpBrands/>
      <Brands/>
    </div>
  );
}
