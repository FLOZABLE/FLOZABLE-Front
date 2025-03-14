"use client";

import styles from "./StudyTrendChart.module.css";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import React, { useEffect, useState } from "react";
import AccountWall from "@/components/others/AccountWall/AccountWall";
import SubjectLabels from "../SubjectLabels/SubjectLabels";
import { updateSubjectsTrendChart } from "@/utils/statTools";
import { STUDY_TREND_COLORS } from "@/utils/constants";
import { secondConverter } from "@/utils/tools";

function StudyTrendChart({ viewDate, viewer, subjects, userId }) {
  const [subjectsTrend, setSubjectsTrend] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    if (!subjects || !viewDate || !viewer) return;
    const subjectsTrend = updateSubjectsTrendChart(subjects, viewDate, viewer);
    setSubjectsTrend(subjectsTrend);
  }, [subjects, viewDate, viewer]);

  return (
    <div className={`box ${styles.StudyTrendChart}`}>
      <div className={`header ${styles.header}`}>
        <h2 className={styles.name}>Study Trend</h2>
      </div>
      {userId ? (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              margin={{ left: -10 }}
              data={subjectsTrend.map((day) => {
                const newDay = {};
                Object.keys(day).map((subjectId) => {
                  if (!filteredSubjects.includes(subjectId)) {
                    newDay[subjectId] = day[subjectId];
                  }
                });
                newDay.label = day.label;

                return newDay;
              })}
            >
              <defs>
                {subjects.map((subject, i) => {
                  return (
                    <linearGradient
                      key={i}
                      id={subject.subject_id}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={
                          STUDY_TREND_COLORS[i % STUDY_TREND_COLORS.length]
                        }
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="70%"
                        stopColor={
                          STUDY_TREND_COLORS[i % STUDY_TREND_COLORS.length]
                        }
                        stopOpacity={0}
                      />
                    </linearGradient>
                  );
                })}
              </defs>
              <CartesianGrid vertical={false} />
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
              {subjects.map((subject, i) => {
                return (
                  <Area
                    name={subject.name}
                    type="monotone"
                    key={subject.subject_id}
                    dataKey={subject.subject_id}
                    stroke={STUDY_TREND_COLORS[i % STUDY_TREND_COLORS.length]}
                    activeDot={{ r: 8 }}
                    fill={`url(#${subject.subject_id})`}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
          <div className={styles.SubjectsLabels}>
            <SubjectLabels
              subjects={subjects}
              filteredSubjects={filteredSubjects}
              setFilteredSubjects={setFilteredSubjects}
            />
          </div>
        </>
      ) : (
        <AccountWall />
      )}
    </div>
  );
}

export default StudyTrendChart;
