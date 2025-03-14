import { DateTime } from "luxon";

function sortNewSubject(subjects, subject) {
  try {
    subjects.sort((a, b) => a.created_at - b.created_at);

    const dayDate = DateTime.fromSeconds(subjects[0].created_at).startOf("day");
    const weekDate = dayDate.startOf("week");
    const monthDate = dayDate.startOf("month");

    const daysLength = subjects[0].day.total.length;
    const weeksLength = subjects[0].week.total.length;
    const monthsLength = subjects[0].month.total.length;

    const dailyArray = [];
    for (let i = 0; i < daysLength; i++) {
      dailyArray.push({ date: dayDate.plus({ day: i }).toISODate(), data: 0 });
    }

    const weeklyArray = [];
    for (let i = 0; i < weeksLength; i++) {
      weeklyArray.push({
        date: weekDate.plus({ week: i }).toISODate(),
        data: 0,
      });
    }

    const monthlyArray = [];
    for (let i = 0; i < monthsLength; i++) {
      monthlyArray.push({
        date: monthDate.plus({ month: i }).toISODate(),
        data: 0,
      });
    }

    subject.timeline = [];

    subject.day = {
      timeline: structuredClone(
        dailyArray.map((val) => ({ ...val, data: [] }))
      ),
      total: structuredClone(dailyArray),
      focus: structuredClone(dailyArray),
    };

    subject.week = {
      timeline: structuredClone(
        weeklyArray.map((val) => ({ ...val, data: [] }))
      ),
      total: structuredClone(weeklyArray),
      focus: structuredClone(weeklyArray),
    };

    subject.month = {
      timeline: structuredClone(
        monthlyArray.map((val) => ({ ...val, data: [] }))
      ),
      total: structuredClone(monthlyArray),
      focus: structuredClone(monthlyArray),
    };

    subjects.push(subject);
    return subjects;
  } catch (err) {
    console.log(err);
    return subjects;
  }
}

function deleteSubject(subjects, subject_id) {
  try {
    const subjectIndex = subjects.findIndex(
      (subject) => subject.subject_id === subject_id
    );
    if (subjectIndex === -1) return subjects;
    const newSubjects = structuredClone(subjects).filter(
      (subject) => subject.subject_id !== subject_id
    );
    const deletedSubject = subjects.find(
      (subject) => subject.subject_id === subject_id
    );

    const otherSubjectIndex = newSubjects.findIndex(
      (subject) => subject.name === "others"
    );
    if (otherSubjectIndex !== -1 && deletedSubject) {
      newSubjects[otherSubjectIndex].day.total.map(
        (value, i) => (value.data += deletedSubject.day.total[i].data)
      );
      newSubjects[otherSubjectIndex].week.total.map(
        (value, i) => (value.data += deletedSubject.week.total[i].data)
      );
      newSubjects[otherSubjectIndex].month.total.map(
        (value, i) => (value.data += deletedSubject.month.total[i].data)
      );

      newSubjects[otherSubjectIndex].day.timeline.map((value, i) => {
        value.data.push(...deletedSubject.day.timeline[i].data);
        value.data.sort((a, b) => a[0] - b[0]);
      });
      newSubjects[otherSubjectIndex].week.timeline.map((value, i) => {
        value.data.push(...deletedSubject.week.timeline[i].data);
        value.data.sort((a, b) => a[0] - b[0]);
      });
      newSubjects[otherSubjectIndex].month.timeline.map((value, i) => {
        value.data.push(...deletedSubject.month.timeline[i].data);
        value.data.sort((a, b) => a[0] - b[0]);
      });

      newSubjects[otherSubjectIndex].week.focus.map((value, i) => {
        const deletedSubjectFocus = deletedSubject.week.focus[i].data;
        value.data =
          value.data > deletedSubjectFocus ? value.data : deletedSubjectFocus;
      });
      newSubjects[otherSubjectIndex].month.focus.map((value, i) => {
        const deletedSubjectFocus = deletedSubject.month.focus[i].data;
        value.data =
          value.data > deletedSubjectFocus ? value.data : deletedSubjectFocus;
      });

      newSubjects[otherSubjectIndex].timeline.push(...deletedSubject.timeline);
      newSubjects[otherSubjectIndex].timeline.sort((a, b) => a[0] - b[0]);
    }

    return newSubjects;
  } catch (err) {
    console.log(err);
    return subjects;
  }
}

export { sortNewSubject, deleteSubject };
