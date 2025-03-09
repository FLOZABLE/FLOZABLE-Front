import React, { useState } from "react";
import styles from "./LineInput.module.css";

interface LineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  value: string; // Keep as required since you’re controlling it
  setValue: (value: string) => void;
  icon?: React.ReactNode;
}

const LineInput: React.FC<LineInputProps> = ({
  title,
  value,
  setValue,
  type = "text", // Default to "text" if not provided
  icon,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={`${styles.LineInput} ${isFocused ? styles.focused : ""}`}>
      {icon ? <i className={styles.icon}>{icon}</i> : null}
      <input
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...inputProps} // Spread all additional input props here
      />
      {title ? <div className={styles.title}>{title}</div> : ""}
      <div
        className={`${styles.lineContainer} ${isFocused ? styles.focused : ""}`}
      >
        <div className={`${styles.line} ${styles.left}`}></div>
        <div className={`${styles.line} ${styles.right}`}></div>
      </div>
    </div>
  );
};

export default LineInput;
