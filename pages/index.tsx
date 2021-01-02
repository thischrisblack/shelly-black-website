import { GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';

import Layout from '../components/Layout';
import styles from './Home.module.scss';

const Index = ({ siteProps }: { siteProps: any }) => {
    const [isShown, setShown] = useState(false);

    const moreDiv = useRef(null);

    // Show full about text.
    useEffect(() => {
        moreDiv.current.style.opacity = `${isShown ? '1' : '0'}`;
    });

    return (
        <Layout
            pageTitle={siteProps.title}
            description="Hello! I'm Shelly, a Japanese Mexican American librarian and photographer in Raleigh, NC."
            url={siteProps.url}
            image={`${siteProps.url}/${siteProps.image}`}
        >
            <article className={styles.content}>
                <div className={styles.left}>
                    <p>
                        Hello! I'm Shelly, a Japanese Mexican American librarian
                        and photographer in Raleigh, NC. {!isShown && '[ '}
                        <a onClick={() => setShown(!isShown)}>
                            {isShown ? '' : 'more'}
                        </a>
                        {!isShown && ' ]'}
                    </p>
                    <div className={styles.more} ref={moreDiv}>
                        <p>
                            I'm currently the Cyma Rubin Library Fellow at North
                            Carolina State University Libraries where I support
                            digital preservation in Special Collections.
                            Previously I was a marketing specialist at the
                            University of Arizona Libraries and was selected as
                            a 2020 Emerging Leader by the American Library
                            Association. During my student days, I worked in
                            special collections and fine art photography
                            archives.
                        </p>
                        <p>
                            As a photographer, I've exhibited in spaces across
                            the US and abroad, such as: Center for Creative
                            Photography, Tucson, AZ; University of Arizona
                            Museum of Art; Tucson International Airport; West
                            Valley Art Museum, Surprise, AZ; ISE Cultural
                            Foundation, New York, NY; and the International
                            Photography Festival, Pingyao, China. My photography
                            has also appeared on wine labels and in alt-weekly
                            music columns. I've also been a professional jewelry
                            photographer and volunteer photography instructor
                            for refugees.
                        </p>
                        <p>
                            I also have 10 years of experience in marketing and
                            skills including copywriting, graphic design, and
                            social media.
                        </p>
                    </div>
                </div>
                <div className={styles.right}></div>
            </article>
        </Layout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    return {
        props: {
            siteProps: configData.default,
        },
    };
};
