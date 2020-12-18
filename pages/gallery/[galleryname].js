import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import Layout from '@components/Layout';

export default function Gallery({ siteTitle, frontmatter, markdownBody }) {
    if (!frontmatter) return <></>;

    return (
        <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <Link href="/">
                <a>Back to post list</a>
            </Link>
            <article>
                <h1>{frontmatter.title}</h1>
                <div>
                    <ReactMarkdown source={markdownBody} />
                </div>
                <div>
                    {frontmatter.images.map((image) => (
                        <img src={image} key={image} />
                    ))}
                </div>
            </article>
        </Layout>
    );
}

export async function getStaticProps({ ...ctx }) {
    const { galleryname } = ctx.params;

    const content = await import(`../../content/galleries/${galleryname}.md`);
    const config = await import(`../../siteconfig.json`);
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
}

export async function getStaticPaths() {
    const blogSlugs = ((context) => {
        const keys = context.keys();
        const data = keys.map((key, index) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);

            return slug;
        });
        return data;
    })(require.context('../../content/galleries', true, /\.md$/));

    const paths = blogSlugs.map((slug) => `/gallery/${slug}`);

    return {
        paths,
        fallback: false,
    };
}
