import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    getSortedPostData,
    blogDirectory,
    IPost,
} from '../utils/content-retrieval';

const Index = ({
    posts,
    title,
    description,
}: {
    posts: Array<IPost>;
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

export const getStaticProps: GetStaticProps = async () => {
    const configData = await import(`../siteconfig.json`);
    const allPostsData = getSortedPostData(blogDirectory);
    return {
        props: {
            posts: allPostsData,
            title: configData.default.title,
            description: configData.default.description,
        },
    };
};
