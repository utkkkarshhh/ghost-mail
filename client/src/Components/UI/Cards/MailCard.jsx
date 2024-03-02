import React from "react";
import styles from "./MailCard.module.css";
import { FaShare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MailCard = (props) => {
  return (
    <div className={styles.mailCard}>
      <p className={styles.message}>{props.message}</p>
      <div className={styles.bottomSection}>
        <div className={styles.bottomSectionInfo}>
          <p className={styles.time} title="Date and Time">
            {props.time}
          </p>
        </div>
        <div className={styles.bottomSectionButtons}>
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
    </div>
  );
};

export default MailCard;
