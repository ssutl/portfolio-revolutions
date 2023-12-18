import React, { useState, useEffect } from "react";
import styles from "../styles/Technogrophy2.module.scss";
import { BlogPost } from "../../@types/schema";
import IosShareIcon from "@mui/icons-material/IosShare";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Head from "next/head";

interface Technogrophy2Props {
  project: BlogPost;
}

const Technogrophy2: React.FC<Technogrophy2Props> = ({ project }) => {
  const shareUrl = `https://ssutl.com/${project.slug}`; // Replace with your actual URL pattern

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Something went wrong sharing the blog post", error);
      }
    } else {
      console.log("Web Share API is not supported in your browser");
    }
  };

  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={project.description}
        />
        <meta name={"og:title"} title={"og:title"} content={project.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={project.description}
        />
        <meta
          name={"og:image"}
          title={"og:image"}
          content={project.cover.url}
        />
      </Head>
      <div className={styles.Technogrophy2}>
        <div className={styles.Technogrophy2__project__image}>
          <img src={project.cover.url} alt="project image" />
          <div className={styles.Technogrophy2__project__metashare}>
            <span onClick={() => handleShare()}>
              <IosShareIcon className={styles.icons} />
              <p>Share</p>
            </span>
            {/* <span>
            <ThumbUpOffAltIcon
              id={styles.emptyThumb}
              className={styles.icons}
            />
            <ThumbUpAltIcon id={styles.fillThumb} className={styles.icons} />
            <p>Like</p>
          </span> */}
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
    </>
  );
};

export default Technogrophy2;
