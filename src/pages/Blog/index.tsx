import React from "react";
import BlogSection from "../../../src/Components/BlogSection";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import NotionService from "../../../services/notion-service";
import { BlogPost } from "../../../@types/schema";
import styles from "../../styles/BlogLandingPage.module.scss";

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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.page}>
      <BlogSection notionPosts={notionPosts} />
    </div>
  );
};
export default BlogLandingPage;
