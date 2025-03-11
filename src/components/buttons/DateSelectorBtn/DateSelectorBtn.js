import styles from "./DateSelectorBtn.module.css";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { getDatesDisplay } from "@/utils/tools";
import { DatePicker } from "@mui/x-date-pickers";
import BlobBtn from "../BlobBtn/BlobBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

function ButtonField({ setIsOpened, label, InputProps }) {
  return (
    <BlobBtn
      onClick={() => setIsOpened?.((prev) => !prev)}
      ref={InputProps.ref}
    >
      <div className={styles.label}>
        <p>{label}</p>
        <i>
          <FontAwesomeIcon icon={faCalendarDay} />
        </i>
      </div>
    </BlobBtn>
  );
}

function DateSelectorBtn({ viewDate, setViewDate, viewer }) {
  const [dateDisp, setDateDisp] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!viewDate || !viewer) return;
    const dateTime = DateTime.fromJSDate(viewDate);
    const date1 = dateTime.startOf(viewer).toJSDate();
    const date2 = viewer === "week" ? dateTime.endOf(viewer).toJSDate() : null;

    const dateDisp = getDatesDisplay({
      date1,
      date2,
      mode: viewer,
      formats: {
        day: "cccc, LLL d",
        week: "LLL d",
        month: "kkkk LLL",
      },
    });
    setDateDisp(dateDisp);
  }, [viewDate, viewer]);

  return (
    <div className={styles.DateSelectorBtn}>
      <DatePicker
        slots={{ field: ButtonField }}
        slotProps={{ field: { setIsOpened } }}
        open={isOpened}
        onClose={() => setIsOpened(false)}
        onOpen={() => setIsOpened(true)}
        label={dateDisp}
        value={DateTime.fromJSDate(viewDate)}
        onChange={(viewDate) => setViewDate(viewDate.toJSDate())}
      />
    </div>
  );
}

export default DateSelectorBtn;
