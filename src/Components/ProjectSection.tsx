import React, { useState, useEffect } from "react";
import styles from "../styles/ProjectSection.module.scss";
import { BlogPost } from "../../@types/schema";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GitHubIcon from "@mui/icons-material/GitHub";
import { githubProjectInterface } from "@/pages";

const ProjectSection = ({
  githubProjects,
}: {
  githubProjects: githubProjectInterface[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  return (
    <div className={styles.projectsSection}>
      <div className={styles.header}>
        <h1>SSUTL can code</h1>
      </div>
      {githubProjects.map((eachProject, i) => (
        <div
          key={i}
          className={styles.postItem}
          onClick={() => {
            if (selectedIndex === i) {
              setSelectedIndex(undefined);
            } else {
              setSelectedIndex(i);
            }
          }}
        >
          <div className={styles.projectTitle}>
            <h1>{eachProject.name}</h1>
            <KeyboardArrowDownIcon
              id={styles.arrow}
              style={{
                transform:
                  selectedIndex === i ? "rotate(0deg)" : "rotate(90deg)",
              }}
            />
          </div>
          {selectedIndex === i && (
            <div
              className={styles.projectDescription}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{eachProject.description}</h2>
              <p>
                Main language: <span>{eachProject.language}</span>
              </p>
              <p>
                Created:{" "}
                {Intl.DateTimeFormat("en-US", options).format(
                  new Date(eachProject.created_at)
                )}
              </p>
              <p>
                Last Updated:{" "}
                {Intl.DateTimeFormat("en-US", options).format(
                  new Date(eachProject.updated_at)
                )}
              </p>
              <p>Watchers: {eachProject.watchers}</p>
              <p
                id={styles.githubLink}
                onClick={() => window.open(eachProject.html_url)}
              >
                <GitHubIcon id={styles.githubIcon} />
                View on Github
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export default ProjectSection;
