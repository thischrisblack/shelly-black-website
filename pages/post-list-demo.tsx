import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    contentPaths,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../utils/get-absolute-image-path';

const Index = ({
    posts,
    title,
    description,
}: {
    posts: Array<IPostFrontmatter>;
    title: string;
    description: string;
}) => {
    return (
        <Layout pageTitle={title}>
            <h1 className="title">Welcome to my blog!</h1>
            <h2 className="title">Welcome to my blog!</h2>
            <h3 className="title">Welcome to my blog!</h3>
            <p className="description">{description}</p>
            <main>
                <PostList posts={posts} />
            </main>
        </Layout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter = getAllPostFrontmatter(contentPaths.blog) || [];
    const postsWithRootImageUrl = allPostsFrontmatter.map((post) => {
        return {
            ...post,
            image: getAbsoluteImageUrl(
                post.image,
                ImageTransformations.Smartcrop,
                200,
                200
            ),
        };
    });
    return {
        props: {
            posts: postsWithRootImageUrl,
            title: configData.default.title,
            description: configData.default.description,
        },
    };
};
