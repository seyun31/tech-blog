import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface MdxContentProps {
  source: string;
}

const mdxComponents = {
  strong: (props: React.ComponentProps<"strong">) => (
    <strong style={{ fontWeight: 700 }} {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote style={{ fontStyle: "normal" }} {...props} />
  ),
};

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: {
                    dark: "github-dark",
                    light: "github-light",
                  },
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
