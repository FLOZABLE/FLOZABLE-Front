"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import DateSelectorBtn from "@/components/buttons/DateSelectorBtn/DateSelectorBtn";
import ViewerSelectorBtn from "@/components/buttons/ViewerSelectorBtn/ViewerSelectorBtn";
import SubjectsPie from "@/components/charts/SubjectsPie/SubjectsPie";
import StudyTrendChart from "@/components/charts/StudyTrendChart/StudyTrendChart";
import { useNextStep } from "nextstepjs";
import { useAccount } from "@/hooks/accountHooks";
import { useSubjects } from "@/hooks/subjectsHooks";
import RankingsTrendsChart from "@/components/charts/RankingsTrendsChart/RankingsTrendsChart";
import StudyHeatMap from "@/components/charts/StudyHeatMap/StudyHeatMap";
import SubjectsTimeline from "@/components/charts/SubjectsTimeline/SubjectsTimeline";
import WebsiteUsageChart from "@/components/charts/WebsiteUsageChart/WebsiteUsageChart";

export default function Stats() {
  const { accountData } = useAccount();
  const { subjects } = useSubjects();

  const { currentStep, setCurrentStep } = useNextStep();

  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState("day");

  useEffect(() => {
    if (currentStep === 14) {
      setTimeout(() => {
        setCurrentStep(15);
      }, 1000);
    } else if (currentStep === 15) {
      setTimeout(() => {
        setCurrentStep(16);
      }, 3000);
    }
  }, [currentStep]);

  return (
    <div className={`page`}>
      <main className={`main`}>
        <div className={styles.top}>
          <DateSelectorBtn
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
          />
          <ViewerSelectorBtn viewer={viewer} setViewer={setViewer} />
        </div>
        <div className={styles.contents}>
          <div className={styles.layer}>
            <StudyTrendChart
              viewDate={viewDate}
              setViewDate={setViewDate}
              viewer={viewer}
              subjects={subjects}
              userId={accountData?.user_id}
            />
          </div>
          <div className={styles.layer}>
            <RankingsTrendsChart
              viewDate={viewDate}
              setViewDate={setViewDate}
              viewer={viewer}
              subjects={subjects}
              userId={accountData?.user_id}
            />
          </div>
          <div className={styles.layer} id={styles.heatmap}>
            <StudyHeatMap viewDate={viewDate} setViewDate={setViewDate} />
          </div>
          <div className={styles.layer} id={styles.timeline}>
            <div className={styles.subjectsTimeline}>
              <SubjectsTimeline viewDate={viewDate} />
            </div>
            <div className={styles.subjectsPie}>
              <SubjectsPie
                viewDate={viewDate}
                setViewDate={setViewDate}
                viewer={viewer}
                setViewer={setViewer}
              />
            </div>
          </div>
          <div className={styles.layer}>
            <WebsiteUsageChart />
          </div>
        </div>
      </main>
    </div>
  );
}
