import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { contentPaths, GalleryCategories, getAllPostFrontmatter, IPostFrontmatter } from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/image-path-helpers';
import styles from '../styles/Content.module.scss';

const Galleries = ({
    siteProps,
    personalProjects,
    otherWork,
}: {
    siteProps: any;
    personalProjects: Array<IPostFrontmatter>;
    otherWork: Array<IPostFrontmatter>;
}) => {
    return (
        <Layout
            pageTitle={`${siteProps.title} | Gallery`}
            description="Photography by Shelly Black."
            url={`${siteProps.url}/galleries`}
            image={{
                src: `${siteProps.url}/images/FoodCity10.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: "Shelly Black's photo gallery.",
            }}
        >
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
    const config = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.galleries, null, {
            transformation: ImageTransformations.Smartcrop,
            w: 600,
            h: 450,
        }) || [];

    const personalProjects = allPostsFrontmatter.filter((post) => post.category === GalleryCategories.Personal);
    const otherWork = allPostsFrontmatter.filter((post) => post.category === GalleryCategories.Other);

    return {
        props: {
            siteProps: config.default,
            personalProjects: personalProjects,
            otherWork: otherWork,
        },
    };
};
