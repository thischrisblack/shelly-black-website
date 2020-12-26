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

export default function Gallery({
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
                    <ReactMarkdown source={content} />
                </div>
                <div>
                    {frontmatter.galleryImages.map((image) => (
                        <img src={image} key={image} />
                    ))}
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { galleryname } = ctx.params;

    const galleryData = getSinglePost(
        galleryname as string,
        contentPaths.galleries
    );
    const config = await import(`../../siteconfig.json`);

    return {
        props: {
            siteTitle: config.title,
            ...galleryData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.galleries).map(
        (id) => `/gallery/${id}`
    );
    return {
        paths,
        fallback: false,
    };
};
