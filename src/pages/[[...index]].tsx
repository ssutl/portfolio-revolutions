import React, { useState, useEffect } from "react";
import Sidebanner from "../Components/SideBanner";
import styles from "../../src/styles/Main.module.scss";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotionService from "../../services/notion-service";
import { BlogPost } from "../../@types/schema";
import axios from "axios";
import Head from "next/head";
import Header from "../Components/Header";
import About3 from "@/Components/About3";
import Technogrophy1 from "@/Components/Technogrophy1";
import Technogrophy2 from "@/Components/Technogrophy2";
import { useRouter } from "next/router";

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

const App = ({
  notionPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { index } = router.query;
  const [location, setLocation] = useState<"Portfolio" | "Store">("Portfolio");
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    const slug = index; // Get the slug from the URL
    if (slug) {
      const index = notionPosts.findIndex((post) => post.slug === slug); // Find the index of the project with the same slug
      if (index !== -1) {
        setCurrentProject(index); // Set current project to that index
      }
    }
  }, [router.query.slug, notionPosts]);

  const changeCurrentProject = (i: number) => {
    if (notionPosts[i]) {
      setCurrentProject(i);
      localStorage.setItem("slug", JSON.stringify(notionPosts[i].slug));
    }
  };

  return (
    <>
      <Head>
        <title>ss.utl</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.main__content}>
          <Header location={location} setLocation={setLocation} />
          {location === "Portfolio" ? (
            <div className={styles.main__content__portfolio}>
              <Technogrophy1
                project={notionPosts[currentProject]}
                projects={notionPosts}
                changeCurrentProject={changeCurrentProject}
              />
              <Technogrophy2 project={notionPosts[currentProject]} />
              <About3
                projects={notionPosts}
                changeCurrentProject={changeCurrentProject}
                currentProject={currentProject}
              />
            </div>
          ) : (
            <div className={styles.main__content__store}>
              <h1>Still creating.....</h1>
            </div>
          )}
        </div>
        <Sidebanner />
      </div>
    </>
  );
};

export default App;