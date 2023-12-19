import React, { useState, useEffect } from "react";
import styles from "../styles/Technogrophy1.module.scss";
import { BlogPost } from "../../@types/schema";

interface Technogrophy1Props {
  project: BlogPost;
  projects: BlogPost[];
  changeCurrentProject: (i: number) => void;
}

const Technogrophy1: React.FC<Technogrophy1Props> = ({
  project,
  projects,
  changeCurrentProject,
}) => {
  return (
    <div className={styles.Technogrophy1}>
      <div className={styles.Technogrophy1__title}>
        <h1>{project.title}</h1>
        <p>By SSUTL</p>
      </div>
      <div className={styles.Technogrophy1__description}>
        <h2>{project.description}</h2>
      </div>
      <div className={styles.Technogrophy1__eyebanner}>
        <img src="/Eyes.jpeg" alt="eyebanner" />
      </div>
      <div className={styles.Technogrophy1__viewall}>
        <p>Full Technogrophy</p>
        <div className={styles.Technogrophy1__projects__containter}>
          {projects.map((project, i) => {
            return (
              <div
                key={i}
                className={styles.Technogrophy1__project}
                onClick={() => changeCurrentProject(i)}
              >
                <img src={project.cover.url} alt="project image" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Technogrophy1;
