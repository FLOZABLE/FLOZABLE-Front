import styles from "./Analysis.module.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { useSubjects } from "@/hooks/subjectsHooks";
import { getAnalysis } from "@/utils/statTools";
import { secondConverter } from "@/utils/tools";

export default function Analysis({ viewDate, viewer }) {
  const { subjects } = useSubjects();

  const [subjectsLine, setSubjectsLine] = useState([]);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const { data, summary } = getAnalysis(viewer, viewDate, subjects);
    setSubjectsLine(data);
    setSummary(summary);
  }, [viewDate, viewer, subjects]);

  return (
    <div className={`box ${styles.Analysis}`}>
      <div className="header">
        <h2 className={styles.summary}>{summary}</h2>
      </div>
      <div className={styles.barChart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={subjectsLine}
            margin={{ left: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis
              tickFormatter={(sec) => {
                const formattedValue = secondConverter({ sec });
                return formattedValue;
              }}
            />
            <Tooltip
              formatter={(sec) => {
                const formattedValue = secondConverter({ sec });
                return formattedValue;
              }}
            />
            <Tooltip />
            <Legend />
            {subjects.map((subject, i) => {
              return (
                <Bar
                  dataKey={subject.name}
                  stackId="a"
                  fill={subject.color}
                  key={i}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
