import dynamic from "next/dynamic";
import ChartLoader from "./ChartLoader";

const DynamicStudyTrendChart = dynamic(
  () => import("@/components/charts/StudyTrendChart"),
  {
    ssr: false, // Ensures it only renders on the client
    loading: ChartLoader, // Shows a loading state while the chunk is fetched
  },
);

export default DynamicStudyTrendChart;
