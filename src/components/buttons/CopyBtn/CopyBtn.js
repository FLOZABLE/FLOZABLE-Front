import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CopyBtn.module.css";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

function CopyBtn({ text, copyText = "Copy!", copiedText = "Copied!" }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied]);
  return (
    <div
      className={styles.CopyBtn}
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setIsCopied(true);
      }}
    >
      <i>
        <FontAwesomeIcon icon={faLink} />
      </i>
      <div className={`hoverText ${styles.hoverText}`}>
        {isCopied ? copiedText : copyText}
      </div>
    </div>
  );
}

export default CopyBtn;
