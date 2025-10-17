import dynamic from "next/dynamic";
import ChartLoader from "./ChartLoader";

const DynamicSubjectsTrendChart = dynamic(
  () => import("@/components/charts/SubjectsTrendChart"),
  {
    ssr: false, // Ensures it only renders on the client
    loading: ChartLoader, // Shows a loading state while the chunk is fetched
  },
);

export default DynamicSubjectsTrendChart;
