import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/Layout';
import { getAllIds, blogDirectory } from '../../lib/util';

export default function BlogPost({
    siteTitle,
    frontmatter,
    markdownBody,
}: {
    siteTitle: string;
    frontmatter: any;
    markdownBody: string;
}) {
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
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    console.log('WOOOO', ctx.params);
    const { id } = ctx.params;

    const content = await import(`../../content/blog/${id}.md`);
    const config = await import(`../../siteconfig.json`);
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(blogDirectory).map((id) => `/post/${id}`);
    console.log(paths);
    return {
        paths,
        fallback: false,
    };
};
