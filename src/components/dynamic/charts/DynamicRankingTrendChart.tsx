import dynamic from "next/dynamic";

import ChartLoader from "./ChartLoader";

const DynamicRankingTrendChart = dynamic(
  () => import("@/components/charts/RankingTrendChart"),
  {
    ssr: false, // Ensures it only renders on the client
    loading: ChartLoader, // Shows a loading state while the chunk is fetched
  },
);

export default DynamicRankingTrendChart;
