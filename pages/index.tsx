import matter from 'gray-matter';
import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { getSortedPostsData, blogDirectory, IPost } from '../lib/util';

const Index = ({
    posts,
    title,
    description,
    ...props
}: {
    posts: Array<IPost>;
    title: string;
    description: string;
}) => {
    console.log('in the component', posts);
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
    const allPostsData = getSortedPostsData(blogDirectory);
    return {
        props: {
            posts: allPostsData,
            title: configData.default.title,
            description: configData.default.description,
        },
    };
};

// export async function getStaticdProps() {
//     const configData = await import(`../siteconfig.json`);

//     const posts = ((context) => {
//         const keys = context.keys();
//         const values = keys.map(context);

//         const data = keys.map((key, index) => {
//             let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
//             const value = values[index];
//             const document = matter(value.default);
//             return {
//                 frontmatter: document.data,
//                 markdownBody: document.content,
//                 slug,
//             };
//         });
//         return data;
//     })(require.context('../content/posts', true, /\.md$/));

//     return {
//         props: {
//             posts,
//             title: configData.default.title,
//             description: configData.default.description,
//         },
//     };
// }
