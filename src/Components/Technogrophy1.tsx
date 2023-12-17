import React, { useState, useEffect } from "react";
import styles from "../styles/Technogrophy1.module.scss";
import { BlogPost } from "../../@types/schema";

interface Technogrophy1Props {
  project: BlogPost;
}

const Technogrophy1: React.FC<Technogrophy1Props> = ({ project }) => {
  return (
    <div className={styles.Technogrophy1}>
      <div className={styles.Technogrophy1__title}>
        <h1>{project.title}</h1>
        <p>By SSUTL</p>
      </div>
      <div className={styles.Technogrophy1__description}>
        <h2>{project.description}</h2>
      </div>
    </div>
  );
};

export default Technogrophy1;
