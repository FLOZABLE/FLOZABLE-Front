"use client";

import PlansTimeline from "@/components/plans/PlansTimeline/PlansTimeline";
import styles from "./page.module.css";
import { useState } from "react";

export default function Stats() {
  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState("day");
  
  <div className="page">
    <main className="main">
      <PlansTimeline
        setViewDate={setViewDate}
        viewDate={viewDate}
        viewer={viewer}
        maxHeight="calc(80vh)"
      />
    </main>
  </div>;
}
