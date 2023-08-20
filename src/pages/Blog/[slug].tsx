import { useEffect } from "react";
import NotionService from "../../../services/notion-service";
import { BlogPost } from "../../../@types/schema";
import styles from "../../styles/BlogPage.module.scss";
import "../../../node_modules/@uiw/react-markdown-preview/esm/styles/markdown.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import Sidebanner from "../../../src/Components/SideBanner";
import convertDateFunc from "../../../src//Helpers/ConvertDate";
import colorConvert from "@/Helpers/NotionColourConverter";
import { GetServerSideProps } from "next";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
  () =>
    import("@uiw/react-markdown-preview").then((mod) => {
      return mod.default;
    }),
  { ssr: false }
);

const BlogPage = ({ markdown, post }: { markdown: any; post: BlogPost }) => {
  console.log("post", post);
  if (!post) {
    return (
      <div>Look at this picture of me whilst you wait for the site to load</div>
    );
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={post.description}
        />
        <meta name={"og:title"} title={"og:title"} content={post.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={post.description}
        />
        <meta name={"og:image"} title={"og:image"} content={post.cover.url} />
      </Head>
      <Sidebanner />

      <div className={styles.blogPage}>
        <div className={styles.imageBanner}>
          <img src={post.cover.url} alt="blog post banner image" />
        </div>
        <div className={styles.BlogSection}>
          <h1>{post.title}</h1>
          <h3>{post.description}</h3>
          <p>{convertDateFunc(post.date)}</p>
          <div className={styles.tags}>
            {post.tags.map((tag, i) => {
              return (
                <p
                  key={i}
                  style={{ backgroundColor: colorConvert(tag.color) }}
                  className={styles.tag}
                >
                  {tag.name}
                </p>
              );
            })}
          </div>
          <MarkdownPreview
            source={markdown}
            wrapperElement={{
              "data-color-mode": "dark",
            }}
            style={{ backgroundColor: "transparent" }}
            disableCopy={true}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const notionService = new NotionService();

  // @ts-ignore
  const p = await notionService.getSingleBlogPost(context.params?.slug);

  if (!p) {
    throw "";
  }

  const markdown = p.markdown as unknown as { parent: string };

  return {
    props: {
      markdown: markdown.parent,
      post: p.post,
    },
  };
};

export default BlogPage;
