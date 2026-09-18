import { Destinations } from "@/components/destinations";
import { Hero } from "@/components/hero";
import { HomeStory } from "@/components/home-story";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeStory />
      <Destinations />
    </main>
  );
}
