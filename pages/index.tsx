import { GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';

import Layout from '../components/Layout';
import styles from './Home.module.scss';

const Index = ({ siteProps }: { siteProps: any }) => {
    const [isShown, setShown] = useState(false);

    const moreDiv = useRef(null);

    // Show full about text.
    // useEffect(() => {
    //     moreDiv.current.style.opacity = `${isShown ? '1' : '0'}`;
    //     moreDiv.current.style.height = `${isShown ? 'auto' : '0px'}`;
    // });

    return (
        <Layout
            pageTitle={siteProps.title}
            description="Hello! I'm Shelly, a Japanese Mexican American librarian and photographer in Raleigh, NC."
            url={siteProps.url}
            image={{
                src: `${siteProps.url}/images/radio-telescope.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: 'Shelly Black with a radio telescope.',
            }}
        >
            <article className={styles.content}>
                <div className={styles.left}>
                    <p>
                        Hello! I’m Shelly, a Japanese Mexican American digital archivist and photographer on the unceded
                        land of the Tuscarora and the Catawba.{' '}
                    </p>
                    {/* {!isShown && (
                        <div className={styles.moreLink}>
                            <a aria-label="Read more about Shelly Black" onClick={() => setShown(!isShown)}>
                                MORE
                            </a>
                        </div>
                    )}
                    <div className={styles.more} ref={moreDiv}>
                        <p>
                            I’m a digital archivist at North Carolina State University Libraries where I support digital
                            preservation in Special Collections. Previously I was a marketing specialist at the
                            University of Arizona Libraries. I’m proud to be a member of{' '}
                            <a href="https://ischool.arizona.edu/knowledge-river">Knowledge River</a> cohort 17 and the
                            2020 class of{' '}
                            <a href="http://www.ala.org/educationcareers/leadership/emergingleaders">
                                American Library Association Emerging Leaders
                            </a>
                            .
                        </p>
                        <p>
                            As a photographer, I’ve exhibited in spaces across the US and overseas, including the{' '}
                            <a href="https://ccp.arizona.edu/">Center for Creative Photography</a>, and my work has
                            appeared on wine labels and in alt-weekly music columns. I’ve also photographed jewelry
                            professionally and taught photography to refugees.
                        </p>
                    </div> */}
                </div>
                <div className={styles.right}>
                    <img src="/images/radio-telescope.jpg" alt="Shelly and radio telescope." />
                </div>
            </article>
        </Layout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const config = await import(`../siteconfig.json`);
    return {
        props: {
            siteProps: config.default,
        },
    };
};
