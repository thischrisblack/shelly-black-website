import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { GetStaticProps, GetStaticPaths } from 'next';

import Layout from '../components/Layout';
import { getAllIds, pagesDirectory } from '../utils/content-retrieval';

export default function PageContainer({
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
    const { pagename } = ctx.params;

    const content = await import(`../content/pages/${pagename}.md`);
    const config = await import(`../siteconfig.json`);
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
    const paths = getAllIds(pagesDirectory).map((id) => `/${id}`);
    return {
        paths,
        fallback: false,
    };
};
