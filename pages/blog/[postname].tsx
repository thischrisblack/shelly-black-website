import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from '../../styles/Content.module.scss';
import PreviousAndNext from '../../components/PreviousAndNext';

import Layout from '../../components/Layout';
import {
    BlogCategories,
    contentPaths,
    getAllIds,
    getPreviousAndNextFrontmatter,
    getSinglePost,
    IPostFrontmatter,
} from '../../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../../utils/get-absolute-image-path';

export default function BlogPost({
    siteTitle,
    previousAndNext,
    frontmatter,
    content,
}: {
    siteTitle: string;
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
    frontmatter: any;
    content: string;
}) {
    if (!frontmatter) return <></>;

    return (
        <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <article className={styles.container}>
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
                <PreviousAndNext previousAndNext={previousAndNext} />
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
                postname === 'cinemagraph' ? null : ImageTransformations.Fit,
                920,
                null
            ),
        },
    };

    const previousAndNextPosts = getPreviousAndNextFrontmatter(
        postname as string,
        contentPaths.blog,
        postData.frontmatter.category as BlogCategories
    );

    const prevAndNextPostsWithRootImageUrl = {
        ...previousAndNextPosts,
        previous: previousAndNextPosts.previous
            ? {
                  ...previousAndNextPosts.previous,
                  image: getAbsoluteImageUrl(
                      previousAndNextPosts.previous?.image,
                      ImageTransformations.Smartcrop,
                      300,
                      150
                  ),
              }
            : null,
        next: previousAndNextPosts.next
            ? {
                  ...previousAndNextPosts.next,
                  image: getAbsoluteImageUrl(
                      previousAndNextPosts.next?.image,
                      ImageTransformations.Smartcrop,
                      300,
                      150
                  ),
              }
            : null,
    };

    return {
        props: {
            siteTitle: config.title,
            previousAndNext: prevAndNextPostsWithRootImageUrl,
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
