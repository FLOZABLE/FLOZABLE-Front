import React, { useState } from "react";
import styles from "./LineInput.module.css";

interface LineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Renamed from 'title' to avoid conflict with HTML attribute
  value: string;
  onEnter: (_value: string) => void;
  setValue: (_value: string) => void;
  icon?: React.ReactNode;
}

const LineInput: React.FC<LineInputProps> = ({
  label,
  value,
  setValue,
  type = "text",
  icon,
  onEnter,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={`${styles.LineInput} ${isFocused ? styles.focused : ""}`}>
      {icon && <i className={styles.icon}>{icon}</i>}
      <input
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            onEnter?.(value);
          }
        }}
        {...inputProps}
      />
      {label && <div className={styles.label}>{label}</div>}
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
