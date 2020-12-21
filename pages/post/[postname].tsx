import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/Layout';
import {
    contentPaths,
    getAllIds,
    getSinglePost,
} from '../../utils/content-retrieval';

export default function BlogPost({
    siteTitle,
    frontmatter,
    content,
}: {
    siteTitle: string;
    frontmatter: any;
    content: string;
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
                    <ReactMarkdown source={content} escapeHtml={false} />
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { postname } = ctx.params;

    const postData = getSinglePost(postname as string, contentPaths.blog);
    const config = await import(`../../siteconfig.json`);

    return {
        props: {
            siteTitle: config.title,
            ...postData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.blog).map((id) => `/post/${id}`);
    return {
        paths,
        fallback: false,
    };
};
