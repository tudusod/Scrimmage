import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { DistrictGrid } from "@/components/DistrictGrid";
import { CtaBanner } from "@/components/Footer";
import { getDistricts } from "@/lib/data";

export default async function Home() {
  const districts = await getDistricts();
  return (
    <>
      <Hero />
      <SearchBar districts={districts} />
      <DistrictGrid districts={districts} />
      <CtaBanner />
    </>
  );
}
