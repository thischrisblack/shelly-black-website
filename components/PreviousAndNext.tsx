import SidebarPost from './SidebarPost';
import styles from '../styles/Content.module.scss';
import { IPostFrontmatter } from '../utils/content-retrieval';

export default function PreviousAndNext({
    previousAndNext,
}: {
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
}) {
    return (
        <div className={styles.postNav}>
            {previousAndNext.previous && (
                <SidebarPost
                    post={previousAndNext.previous}
                    previousOrNext="Previous"
                />
            )}
            {previousAndNext.next && (
                <SidebarPost
                    post={previousAndNext.next}
                    previousOrNext="Next"
                />
            )}
        </div>
    );
}
