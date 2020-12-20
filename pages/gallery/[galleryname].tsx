import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/Layout';
import { galleriesDirectory, getAllIds } from '../../utils/content-retrieval';

export default function Gallery({
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
    // TODO: Use getSinglePost here like in [postname].tsx
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
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(galleriesDirectory).map((id) => `/gallery/${id}`);
    return {
        paths,
        fallback: false,
    };
};
