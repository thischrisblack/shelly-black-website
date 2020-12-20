import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    contentPaths,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';

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
            <p className="description">{description}</p>
            <main>
                <PostList posts={posts} />
            </main>
        </Layout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    console.log(ctx);
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter = getAllPostFrontmatter(contentPaths.blog) || [];
    return {
        props: {
            posts: allPostsFrontmatter,
            title: configData.default.title,
            description: configData.default.description,
        },
    };
};
