import { api } from "@/lib/api";
import LandingView from "@/components/LandingView";

export const revalidate = 60;

export default async function Home() {
     let stats = {
          totalVoters: 0,
          votesCast: 0,
          turnout: "0%"
     };

     try {
          stats = await api.getStats({ next: { revalidate: 60 } });
     } catch (err) {
          console.error("Failed to fetch stats:", err);
     }

     return <LandingView />;
}
