import { InfoPost, InfoTable } from "@/lib/info-posts";

export const InfoPosts = ({ data }: { data: InfoPost[] }) => {
  return (
    <div className="@container">
      <div className="grid @3xl:grid-cols-2 @5xl:grid-cols-3 gap-3">
        {data.map((post) => (
          <article
            key={post.id}
            className="flex flex-col flex-1 gap-6 overflow-hidden rounded-2xl p-4 pb-6 bg-white"
          >
            <header>
              <h2 className="text-xl text-foreground font-sans font-semibold">
                {post.title}
              </h2>
            </header>

            {post.intro && (
              <div className="flex flex-col gap-1">
                {post.intro.heading && (
                  <h3 className="text-sm font-bold text-foreground">
                    {post.intro.heading}
                  </h3>
                )}
                <p className="text-sm text-foreground">{post.intro.body}</p>
              </div>
            )}

            {post.table && <PostTable table={post.table} />}

            <footer className="mt-auto pt-8">
              <p className="text-sm text-foreground-1">
                Uppdaterad {showDate(post.updated)}
              </p>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

const PostTable = ({ table }: { table: InfoTable }) => {
  return (
    // Bleed the table to the card edges (card has p-4); cell padding keeps
    // the text aligned with the rest of the card body.
    <div className="-mx-4">
      <table className="relative w-full text-left text-sm text-foreground">
        <thead>
          <tr>
            {table.head.map((heading) => (
              <th key={heading} className="px-2 pb-2 font-bold first:pl-4 last:pr-4">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="even:bg-gray-100">
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-2 first:pl-4 last:pr-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {table.note && (
            <tr>
              <td
                colSpan={table.head.length}
                className="px-4 pt-6 text-sm text-foreground-1"
              >
                {table.note}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const showDate = (timeStr: string) => {
  const date = new Date(timeStr);
  return date.toLocaleDateString();
};
