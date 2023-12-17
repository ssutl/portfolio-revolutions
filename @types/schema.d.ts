import { colorKeys } from "@/Helpers/NotionColourConverter";
import { MdStringObject } from "notion-to-md/build/types";

export type Tag = {
  color: colorKeys;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  cover: string;
  title: string;
  tech: string[]; // Add this line
  tags: string[];
  description: string;
  date: string;
  slug: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: MdStringObject;
};
