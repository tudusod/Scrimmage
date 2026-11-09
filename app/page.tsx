import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { DistrictGrid } from "@/components/DistrictGrid";
import { MatchFeed } from "@/components/MatchFeed";
import { CtaBanner } from "@/components/Footer";
import { getDistricts, getLatestMatches } from "@/lib/data";

export default async function Home() {
  const [districts, matches] = await Promise.all([getDistricts(), getLatestMatches()]);
  return (
    <>
      <Hero />
      <SearchBar districts={districts} />
      <DistrictGrid districts={districts} />
      <MatchFeed matches={matches} />
      <CtaBanner />
    </>
  );
}