import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    BlogCategories,
    contentPaths,
    GalleryCategories,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/get-absolute-image-path';
import styles from '../styles/Content.module.scss';

const Galleries = ({
    personalProjects,
    otherWork,
    title,
}: {
    personalProjects: Array<IPostFrontmatter>;
    otherWork: Array<IPostFrontmatter>;
    title: string;
}) => {
    return (
        <Layout pageTitle={`${title} | Gallery`}>
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Gallery</h2>
                </div>
                <div className={styles.content}>
                    <h2>Personal Projects</h2>
                    <PostList posts={personalProjects} postType="gallery" />
                    <h2>Other Work</h2>
                    <PostList posts={otherWork} postType="gallery" />
                </div>
            </article>
        </Layout>
    );
};

export default Galleries;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.galleries, null, {
            transformation: ImageTransformations.Smartcrop,
            w: 600,
            h: 450,
        }) || [];

    const personalProjects = allPostsFrontmatter.filter(
        (post) => post.category === GalleryCategories.Personal
    );
    const otherWork = allPostsFrontmatter.filter(
        (post) => post.category === GalleryCategories.Other
    );

    return {
        props: {
            personalProjects: personalProjects,
            otherWork: otherWork,
            title: configData.default.title,
        },
    };
};
