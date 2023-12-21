import { Client } from "@notionhq/client";
import { BlogPost, PostPage } from "../@types/schema";
import { NotionToMarkdown } from "notion-to-md";

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({
      auth: process.env.NEXT_PUBLIC_NOTION_ACCESS_TOKEN,
    });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
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

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res);
    });
  }

  async getSingleBlogPost(slug: string): Promise<PostPage> {
    let post, markdown;

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
    markdown = this.n2m.toMarkdownString(mdBlocks);
    post = NotionService.pageToPostTransformer(page);

    return {
      post,
      markdown,
    };
  }

  private static pageToPostTransformer(page: any): BlogPost {
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
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Date.date.start,
      slug: page.properties.Slug.formula.string,
    };
  }
}
