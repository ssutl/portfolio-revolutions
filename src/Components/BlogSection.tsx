import convertDateFunc from "../Helpers/ConvertDate";
import { BlogPost } from "../../@types/schema";
import styles from "../styles/BlogSection.module.scss";
import { useRouter } from "next/router";

const BlogSection = ({ notionPosts }: { notionPosts: BlogPost[] }) => {
  const router = useRouter();

  // Extract the relevant date components
  if (notionPosts.length === 0) return null;
  return (
    <div className={styles.BlogSection}>
      <div className={styles.header}>
        <h1>SSUTL can blog</h1>
      </div>
      {notionPosts.map((post: BlogPost, i) => (
        <div
          key={i}
          className={styles.postItem}
          onClick={() => router.push(`/Blog/${post.slug}`)}
        >
          {
            //If the date is within last 7 days then show a p saing new
          }
          <h1>{post.title}</h1>
          <p>{convertDateFunc(post.date)}</p>
        </div>
      ))}
    </div>
  );
};
export default BlogSection;
