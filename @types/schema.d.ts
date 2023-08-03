import { colorKeys } from "@/Helpers/NotionColourConverter";
import { MdStringObject } from "notion-to-md/build/types";

export type Tag = {
  color: colorKeys;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: MdStringObject;
};
