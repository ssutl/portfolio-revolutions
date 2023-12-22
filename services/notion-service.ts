import { Client } from "@notionhq/client";
import {
  BlogPostConMarkdown,
  BlogPostSinMarkdown,
  PostPage,
} from "../@types/schema";
import { NotionToMarkdown } from "notion-to-md";
import { MdStringObject } from "notion-to-md/build/types";

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({
      auth: process.env.NEXT_PUBLIC_NOTION_ACCESS_TOKEN,
    });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getPublishedBlogPosts(): Promise<BlogPostConMarkdown[]> {
    const database = process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE_ID ?? "";
    // list blog posts
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Updated",
          direction: "descending",
        },
      ],
    });

    // Fetch the markdown for each post
    const postsWithMarkdown = await Promise.all(
      response.results.map(async (res) => {
        const post = NotionService.pageToPostTransformer(res);
        const markdown = await this.getSingleBlogPostMarkdown(post.slug);
        return { ...post, markdown };
      })
    );

    return postsWithMarkdown;
  }

  async getSingleBlogPostMarkdown(slug: string): Promise<string> {
    let markdown;

    const database = process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE_ID ?? "";
    // list of blog posts
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: "Slug",
        formula: {
          text: {
            equals: slug, // slug
          },
        },
        // add option for tags in the future
      },
      sorts: [
        {
          property: "Updated",
          direction: "descending",
        },
      ],
    });

    if (!response.results[0]) {
      throw "No results available";
    }

    // grab page from notion
    const page = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    markdown = this.n2m.toMarkdownString(mdBlocks) as { parent: string };

    return markdown.parent;
  }

  private static pageToPostTransformer(page: any): BlogPostSinMarkdown {
    let cover = page.cover;

    switch (cover.type) {
      case "file":
        cover = page.cover.file;
        break;
      case "external":
        cover = page.cover.external.url;
        break;
      default:
        // Add default cover image if you want...
        cover = "";
    }

    const title = page.properties.Name.title
      .map((block: any) => block.plain_text)
      .join(" ");

    const description = page.properties.Description.rich_text
      .map((block: any) => block.plain_text)
      .join(" ");

    const tech = page.properties.Tech.multi_select.map(
      (tech: any) => tech.name
    ); // Add this line

    return {
      id: page.id,
      cover: cover,
      title: title,
      tech: tech,
      github: page.properties.Github.url,
      tags: page.properties.Tags.multi_select,
      description: description,
      date: page.properties.Date.date.start,
      slug: page.properties.Slug.formula.string,
      video: page.properties.Video.url,
    };
  }
}
