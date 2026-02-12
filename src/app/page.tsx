import { api } from "@/lib/api";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LiveTrackSection from "@/components/sections/LiveTrackSection";
import CandidatesSection from "@/components/sections/CandidatesSection";
import TimelineSection from "@/components/sections/TimelineSection";

export const revalidate = 60;

export default async function Home() {
     let stats = {
          totalVoters: 0,
          votesCast: 0,
          turnout: "0%"
     };

     let results = [];
     let candidates = [];

     try {
          const statsReq = api.getStats({ next: { revalidate: 60 } });
          const resultsReq = api.getResults({ next: { revalidate: 60 } });
          const candidatesReq = api.getCandidates({ next: { revalidate: 60 } });

          const [statsData, resultsData, candidatesData] = await Promise.all([statsReq, resultsReq, candidatesReq]);
          stats = statsData;
          results = resultsData;
          candidates = candidatesData;
     } catch (err) {
          console.error("Failed to fetch data:", err);
     }

     return (
          <main className="min-h-screen bg-neutral-cream overflow-x-hidden">
               <HeroSection />
               <AboutSection />
               <LiveTrackSection stats={stats} results={results} />
               <CandidatesSection candidates={candidates} />
               <TimelineSection />
          </main>
     );
}
