import React, { CSSProperties, ReactNode } from "react";
import styles from "./BlobBtn.module.css";

interface BlobBtnProps extends React.HTMLProps<HTMLDivElement> {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  color1?: string;
  color2?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

const BlobBtn: React.FC<BlobBtnProps> = ({
  onClick,
  color1 = "#fff",
  color2 = "var(--gray-3)",
  children,
  style = {},
  ...otherProps
}) => {
  return (
    <div
      className={styles.BlobBtn}
      onClick={(e) => {
        onClick?.(e);
      }}
      style={
        {
          "--blob-color-1": color1,
          "--blob-color-2": color2,
          ...style,
        } as React.CSSProperties
      }
      {...otherProps}
    >
      {children}
      <span className={styles.blobBtnInner}>
        <span className={styles.blobBtnBlobs}>
          <span className={styles.blobBtnBlob}></span>
          <span className={styles.blobBtnBlob}></span>
          <span className={styles.blobBtnBlob}></span>
          <span className={styles.blobBtnBlob}></span>
        </span>
      </span>
    </div>
  );
};

export default BlobBtn;
