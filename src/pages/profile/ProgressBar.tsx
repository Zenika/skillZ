import React, { Component } from "react";
import Image from "next/image";
import styled from "styled-components";
import ProgressInTracker from "./ProgressInTracker";
import styles from "./ProgressInTracker.module.css";

class ProgressBar extends Component {
  render() {
    return (
      <div className={styles.progresseTrackerBackground}>
        <ProgressInTracker percentage={30} />
      </div>
    );
  }
}

export default ProgressBar;
