import { colorKeys } from "@/Helpers/NotionColourConverter";
import { MdBlock, MdStringObject } from "notion-to-md/build/types";

export type Tag = {
  color: colorKeys;
  id: string;
  name: string;
};

export type BlogPostSinMarkdown = {
  id: string;
  cover: {
    url: string;
  };
  title: string;
  tech: string[]; // Add this line
  tags: string[];
  description: string;
  date: string;
  slug: string;
  github: string;
};

export type BlogPostConMarkdown = {
  id: string;
  cover: {
    url: string;
  };
  title: string;
  tech: string[]; // Add this line
  tags: string[];
  description: string;
  date: string;
  slug: string;
  github: string;
  markdown: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: { parent: string };
};
