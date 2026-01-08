import { api } from "@/lib/api";
import ResultsView from "@/components/ResultsView";

export const revalidate = 60;

export default async function ResultsPage() {
     let results = [];
     let stats = { totalVoters: 0, votesCast: 0, turnout: "0%", onlineVotes: 0, offlineVotes: 0 };

     try {
          const [statsData, resultsData] = await Promise.all([
               api.getStats({ next: { revalidate: 60 } }),
               api.getResults({ next: { revalidate: 60 } })
          ]);
          stats = statsData;
          results = resultsData;
     } catch (e) {
          console.error("Failed to fetch initial results", e);
     }

     return <ResultsView initialResults={results} initialStats={stats} />;
}
