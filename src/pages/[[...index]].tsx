import React, { useState, useEffect, useRef } from "react";
import Sidebanner from "../Components/SideBanner";
import styles from "../../src/styles/Main.module.scss";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotionService from "../../services/notion-service";
import { BlogPostConMarkdown } from "../../@types/schema";
import axios from "axios";
import Head from "next/head";
import Header from "../Components/Header";
import About3 from "@/Components/About3";
import Technogrophy1 from "@/Components/Technogrophy1";
import Technogrophy2 from "@/Components/Technogrophy2";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  notionPosts: BlogPostConMarkdown[];
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
  const [location, setLocation] = useState<"Portfolio" | "About" | "Store">(
    "Portfolio"
  );
  const [currentProject, setCurrentProject] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slug = index; // Get the slug from the URL

    if (!router.isReady) return;

    switch (slug?.toString().toLocaleLowerCase()) {
      case "store":
        setLocation("Store");
        break;
      default:
        const index = notionPosts.findIndex((post) => post.slug === slug); // Find the index of the project with the same slug
        if (index !== -1) {
          setCurrentProject(index); // Set current project to that index
        }
    }
  }, [router.isReady]);

  const changeCurrentProject = (i: number) => {
    if (notionPosts[i]) {
      setCurrentProject(i);
      localStorage.setItem("slug", JSON.stringify(notionPosts[i].slug));
    }
    if (window.innerWidth <= 768) {
      mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>
          {location === "Store"
            ? "STORE"
            : location === "About"
            ? "About SSUTL"
            : null}
        </title>
      </Head>
      <div className={styles.main} ref={mainRef}>
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
          ) : location === "About" ? (
            <div className={styles.main__content__about}>
              <h1>SSUTL is everything self proclaimed.</h1>
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
