import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from './Post.module.scss';

import Layout from '../../components/Layout';
import {
    contentPaths,
    getAllIds,
    getSinglePost,
} from '../../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../../utils/get-absolute-image-path';

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
            <article className={styles.post}>
                <div className={styles.meta}>
                    <p>
                        {new Date(frontmatter.date).toLocaleDateString([], {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <h2>{frontmatter.title}</h2>
                    <p>
                        <em>{frontmatter.category}</em>
                    </p>
                </div>
                <div className={styles.content}>
                    <img src={frontmatter.image} />
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

    const postDataWithRootImageUrl = {
        ...postData,
        frontmatter: {
            ...postData.frontmatter,
            image: getAbsoluteImageUrl(
                postData.frontmatter.image,
                ImageTransformations.Fit,
                920,
                null
            ),
        },
    };

    return {
        props: {
            siteTitle: config.title,
            ...postDataWithRootImageUrl,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.blog).map((id) => `/blog/${id}`);
    return {
        paths,
        fallback: false,
    };
};
