import SidebarPost from './SidebarPost';
import { IPostFrontmatter } from '../utils/content-retrieval';

export default function PreviousAndNext({
    previousAndNext,
}: {
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
}) {
    return (
        <>
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
        </>
    );
}
