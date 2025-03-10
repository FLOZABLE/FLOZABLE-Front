import styles from "./SubjectsPie.module.css";
import { useContext, useEffect, useState } from "react";
import { secondConverter } from "@/utils/tools";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSubjects } from "@/hooks/subjectsHooks";
import { AddSubjectsModalContext } from "@/components/structure/ModalProviders";
import ViewerSelectorBtn from "@/components/buttons/ViewerSelectorBtn/ViewerSelectorBtn";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import DateSelectorBtn from "@/components/Buttons/DateSelectorBtn/DateSelectorBtn";
import PieCustomTooltip from "../PieCustomTooltip";
import { updateTimeUsagePie } from "@/utils/statTools";

function SubjectsPie({ viewDate, setViewDate, viewer, setViewer }) {
  const { subjects, subjectsIsLoading } = useSubjects();
  const { setIsAddSubjectModal } = useContext(AddSubjectsModalContext);

  const [subjectsPie, setSubjectsPie] = useState([]);
  const [totalTime, setTotalTime] = useState("0 Seconds");

  useEffect(() => {
    if (!subjects || !viewDate || !viewer) return;

    const subjectsPie = updateTimeUsagePie(subjects, viewDate, viewer).filter(
      (subject) => subject.value
    );
    setSubjectsPie(subjectsPie);
    let totalTime = 0;
    subjectsPie.map((subject) => {
      totalTime += subject.value;
    });
    const formattedValue = secondConverter({
      sec: totalTime,
      options: ["seconds", "minutes", "hours"],
    });
    setTotalTime(formattedValue);
  }, [subjects, viewDate, viewer]);

  return (
    <div className={`Box ${styles.SubjectsPie}`}>
      <div className={`header`} data-tutorial={17}>
        <h2>Subjects</h2>
        <div id={styles.dateSelectorBtn}>
          <DateSelectorBtn
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
          />
        </div>
        <div
          id={styles.addSubjectBtn}
          className="button"
          onClick={() => {
            setIsAddSubjectModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <ViewerSelectorBtn viewer={viewer} setViewer={setViewer} />
      {subjectsIsLoading ? (
        <CircularLoading />
      ) : !subjectsPie.length ? (
        <div className={styles.chartContainer} id={styles.noChart}>
          <Link href={"/dashboard/study"}>Study to see stats</Link>
        </div>
      ) : (
        <div className={styles.chartContainer}>
          <div className={styles.totalTime}>
            <p className={styles.time}>{totalTime}</p>
            <p className={styles.text}>Total</p>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<PieCustomTooltip />} />
              <Pie
                cx="50%"
                cy="50%"
                labelLine={false}
                data={subjectsPie}
                dataKey={"value"}
                outerRadius={"100%"}
                innerRadius={"70%"}
                fill="green"
              ></Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className={`customScroll ${styles.labels}`}>
        {subjectsPie.map((subject, i) => {
          return (
            <div className={styles.label} key={i}>
              <div
                className={styles.icon}
                style={{ backgroundColor: subject.fill }}
              ></div>
              <p className={styles.name}>{subject.name}</p>
              <p className={styles.time}>{subject.labelVal}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectsPie;
