import React from "react";
import Sidebanner from "../../src/Components/SideBanner";
import styles from "../../src/styles/Main.module.scss";
import AboutMeSection from "../../src/Components/AboutMeSection";
import ProfileSection from "../../src/Components/ProfileSection";
import BlogSection from "../../src/Components/BlogSection";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotionService from "../../services/notion-service";
import { BlogPost } from "../../@types/schema";
import axios from "axios";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{
  notionPosts: BlogPost[];
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

  return {
    props: {
      notionPosts,
    },
  };
};

const App = ({
  notionPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>ss.utl</title>
      </Head>
      <div className={styles.main}>
        <ProfileSection />
        <AboutMeSection />
        <BlogSection notionPosts={notionPosts} />
        <Sidebanner />
      </div>
    </>
  );
};

export default App;
