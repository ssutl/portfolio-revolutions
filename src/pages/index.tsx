import React from "react";
import Sidebanner from "../../src/Components/SideBanner";
import styles from "../../src/styles/Main.module.scss";
import ProjectSection from "../../src/Components/ProjectSection";
import AboutMeSection from "../../src/Components/AboutMeSection";
import ProfileSection from "../../src/Components/ProfileSection";
import BlogSection from "../../src/Components/BlogSection";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import NotionService from "../../services/notion-service";
import { BlogPost } from "../../@types/schema";
import axios from "axios";
import Head from "next/head";

export interface githubProjectInterface {
  name: string;
  html_url: string;
  language: string;
  watchers: number;
  created_at: string;
  updated_at: string;
  description: string;
}

export const getStaticProps: GetStaticProps<{
  notionPosts: BlogPost[];
  githubProjects: githubProjectInterface[];
}> = async (context) => {
  const notionService = new NotionService();
  const notionPosts = await notionService.getPublishedBlogPosts();

  const projects = await axios({
    method: "GET",
    url: " https://api.github.com/users/ssutl/repos",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const githubProjects = projects.data;

  return {
    props: {
      notionPosts,
      githubProjects,
    },
  };
};

const App = ({
  notionPosts,
  githubProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>ss.utl</title>
        <meta
          name={"description"}
          title={"description"}
          content="Somewhere in Manny with my headphones on. UOM Engineer, tap in for gems and vibes, sumn humble, sumn subtle. Ever so, ever so."
        />
        <meta
          name={"og:title"}
          title={"og:title"}
          content="A SSUTL PORTFOLIO"
        />
        <meta
          name={"og:description"}
          title={"og:description"}
          content="Somewhere in Manny with my headphones on. UOM Engineer, tap in for gems and vibes, sumn humble, sumn subtle. Ever so, ever so."
        />
        <meta
          name={"og:image"}
          title={"og:image"}
          content="../../public/icon.jpg"
        />
      </Head>
      <div className={styles.main}>
        <ProfileSection />
        <AboutMeSection />
        <BlogSection notionPosts={notionPosts} />
        <ProjectSection githubProjects={githubProjects} />
        <Sidebanner />
      </div>
    </>
  );
};

export default App;
