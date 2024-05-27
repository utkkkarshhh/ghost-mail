import React from "react";
import styles from "./MailItem.module.css";
import { FaShare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MailItem = (props) => {
  return (
    <div className={styles.mailItem}>
      <div className={styles.mailInfoSection}>
        <div className={styles.mailItemCheckbox}>
          <input type="checkbox"></input>
        </div>
        <div className={styles.mailTime}>
          <p className={styles.time} title="Date and Time">
            {props.time}
          </p>
        </div>
        <div className={styles.mailTextPreview}>
          <p className={styles.message}>{props.message}</p>
        </div>
      </div>

      <div className={styles.mailButtons}>
        <button
          className={styles.shareButton}
          onClick={() => props.onShare(props.id)}
          title="Share with your friends!"
        >
          <FaShare />
        </button>

        <button
          className={styles.deleteButton}
          onClick={() => props.onClick(props.id)}
          title="Delete this message!"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default MailItem;
