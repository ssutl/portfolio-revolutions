import React from "react";
import BlogSection from "../../../src/Components/BlogSection";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotionService from "../../../services/notion-service";
import { BlogPost } from "../../../@types/schema";
import styles from "../../styles/BlogLandingPage.module.scss";
import Sidebanner from "@/Components/SideBanner";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{
  notionPosts: BlogPost[];
}> = async (context) => {
  const notionService = new NotionService();
  const notionPosts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      notionPosts,
    },
  };
};

const BlogLandingPage = ({
  notionPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>BLOG</title>
        <meta name="ss.utl" content="SSUTl CAN BLOG 📜" />
      </Head>
      <div className={styles.page}>
        <Sidebanner />
        <BlogSection notionPosts={notionPosts} />
      </div>
    </>
  );
};

export default BlogLandingPage;
