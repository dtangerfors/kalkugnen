import { InfoPost } from "@/lib/types";
import "./styles.css";

export const InfoPosts = ({ data }: { data: InfoPost[] }) => {
  return (
    <div className="@container">
      <div className="grid @3xl:grid-cols-2 @5xl:grid-cols-3 gap-3">
        {data.map((post: InfoPost) => {
          return (
            <article
              key={post.id}
              className="flex flex-col flex-1 gap-6 overflow-hidden rounded-2xl p-4 pb-6 bg-white"
            >
              <header>
                <h2 className="text-xl text-foreground font-sans font-semibold">
                  {post.title.rendered}
                </h2>
              </header>
              <div
                className="wp-post-content"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
              <footer className="mt-auto pt-8">
                <p className="text-sm text-foreground-1">
                  Publicerad {showDate(post.date)}
                </p>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
};

const showDate = (timeStr: string) => {
  const date = new Date(timeStr);
  return date.toLocaleDateString();
};
