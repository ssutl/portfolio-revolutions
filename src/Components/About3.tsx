import React, { useState, useEffect } from "react";
import styles from "../styles/About3.module.scss";
import { BlogPostConMarkdown } from "../../@types/schema";

interface About3Props {
  projects: BlogPostConMarkdown[];
  changeCurrentProject: (i: number) => void;
  currentProject: number;
}

const About3: React.FC<About3Props> = ({
  projects,
  changeCurrentProject,
  currentProject,
}) => {
  if (!projects) return null;
  return (
    <div className={styles.About3}>
      <div className={styles.imageContainer}>
        <img src="/Profile.jpeg" alt="Photo of me" />
      </div>
      <div className={styles.titleContainer}>
        <h3>SSUTL</h3>
        <p>BRUM, MANNY</p>
      </div>
      <div
        className={styles.followContainer}
        onClick={() =>
          window.open("https://www.instagram.com/ss.utl/", "_blank")
        }
      >
        <p>Follow</p>
      </div>
      <div className={styles.descriptionContainer}>
        <h3>It’s a culture, a lifestyle, a way of living.</h3>
        <p>
          You have to live it to understand, follow to lead, admit guilt to
          accept truth.
        </p>
      </div>
      {/* <div className={styles.technogrophyCard}>
        {projects.map((project, i) => {
          return (
            <div
              key={i}
              className={`${styles.projectTitle} ${
                i === currentProject ? styles.active : ""
              }`}
              onClick={() => changeCurrentProject(i)}
            >
              <p>{project.title}</p>
              <p>.{i}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default About3;
