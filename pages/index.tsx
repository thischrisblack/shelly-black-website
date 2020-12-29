import { GetStaticProps } from 'next';
import styles from './Home.module.scss';
import Layout from '../components/Layout';

const Index = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <Layout pageTitle={title}>
            <article className={styles.post}>WOAH</article>
        </Layout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    return {
        props: {
            title: configData.default.title,
            description: configData.default.description,
        },
    };
};
