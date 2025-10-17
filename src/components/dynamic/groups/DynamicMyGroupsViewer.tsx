import dynamic from "next/dynamic";

function MyGroupsViewerLoader() {
  return (
    <div className="h-[80vh] relative">
      <p className="absolute-center">My Groups Loading...</p>
    </div>
  );
}

const DynamicMyGroupsViewer = dynamic(
  () => import("@/components/groups/MyGroupsViewer"),
  {
    ssr: false,
    loading: MyGroupsViewerLoader,
  },
);

export default DynamicMyGroupsViewer;
