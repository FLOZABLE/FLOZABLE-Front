import PlansTimeline from "@/components/plans/PlansTimeline/PlansTimeline";
import styles from "./page.module.css";
import { default as EventPlanner } from "@/components/plans/Planner/Planner";

export default function Planner() {
  return (
    <div className={`page`}>
      <main className={`main`}>
        <div className={styles.layer}>
          <div className={`box ${styles.left}`}>
            <EventPlanner />
          </div>
          <div className={`box ${styles.right}`}>
            <PlansTimeline
              viewDate={new Date(new Date().setHours(0, 0, 0, 0))}
              viewer={"day"}
              maxHeight="calc(100vh - 2.5rem)"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
