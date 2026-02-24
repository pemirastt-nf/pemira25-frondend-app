/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LiveTrackSection from "@/components/sections/LiveTrackSection";
import TutorialSection from "@/components/sections/TutorialSection";
import CandidatesSection from "@/components/sections/CandidatesSection";
import TimelineSection from "@/components/sections/TimelineSection";
import WinnerSection from "@/components/sections/WinnerSection";

export const revalidate = 60;

export default async function Home() {
     let stats = {
          totalVoters: 0,
          votesCast: 0,
          turnout: "0%"
     };

     let results = [];
     let candidates = [];
     let winnerData = null;

     try {
          const statsReq = api.getStats({ next: { revalidate: 60 } });
          const resultsReq = api.getResults({ next: { revalidate: 60 } });
          const candidatesReq = api.getCandidates({ next: { revalidate: 60 } });
          const winnerReq = api.getWinner({ next: { revalidate: 60 } });

          const [statsData, resultsData, candidatesData, winnerInfo] = await Promise.all([statsReq, resultsReq, candidatesReq, winnerReq]);
          stats = statsData;
          results = resultsData?.filter((r: any) => r.name !== 'SUARA TIDAK SAH') || [];
          candidates = candidatesData?.filter((c: any) => c.name !== 'SUARA TIDAK SAH') || [];
          winnerData = winnerInfo;
     } catch (err) {
          console.error("Failed to fetch data:", err);
     }

     return (
          <main className="min-h-screen bg-neutral-cream overflow-x-hidden">
               <HeroSection />
               <WinnerSection winnerData={winnerData} />
               <AboutSection />
               <LiveTrackSection stats={stats} results={results} />
               <TutorialSection />
               <CandidatesSection candidates={candidates} />
               <TimelineSection />
          </main>
     );
}
