import React, { useState, useEffect } from "react";
import styles from "../styles/Technogrophy2.module.scss";
import { BlogPost } from "../../@types/schema";
import IosShareIcon from "@mui/icons-material/IosShare";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

interface Technogrophy2Props {
  project: BlogPost;
}

const Technogrophy2: React.FC<Technogrophy2Props> = ({ project }) => {
  return (
    <div className={styles.Technogrophy2}>
      <div className={styles.Technogrophy2__project__image}>
        <img src={project.cover.url} alt="project image" />
        <div className={styles.Technogrophy2__project__metashare}>
          <span>
            <IosShareIcon className={styles.icons} />
            <p>Share</p>
          </span>
          <span>
            <ThumbUpOffAltIcon
              id={styles.emptyThumb}
              className={styles.icons}
            />
            <ThumbUpAltIcon id={styles.fillThumb} className={styles.icons} />
            <p>Like</p>
          </span>
        </div>
      </div>
      <div className={styles.Technogrophy2__project__metadata}>
        <span>
          <p>{project.date}</p>
        </span>
        {project.tech.map((technology, i) => {
          return (
            <span key={i}>
              <p
                key={i}
                className={styles.Technogrophy2__project__metadata__tech}
              >
                - {technology}
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Technogrophy2;
