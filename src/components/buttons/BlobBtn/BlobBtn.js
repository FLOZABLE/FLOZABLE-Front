import React from "react";
import styles from "./BlobBtn.module.css";

function BlobBtn({
  onClick,
  color1 = "#fff",
  color2 = "var(--gray-3)",
  id,
  children,
  style = {},
  type,
  ...otherProps
}) {
  return (
    <div
      className={styles.BlobBtn}
      onClick={(e) => {
        onClick(e);
      }}
      style={{ "--blob-color-1": color1, "--blob-color-2": color2, ...style }}
      id={id}
      type={type}
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
}

export default BlobBtn;
