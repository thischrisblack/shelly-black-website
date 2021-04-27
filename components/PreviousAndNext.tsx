import SidebarPost from './SidebarPost';
import { IPostFrontmatter } from '../utils/content-retrieval';

export default function PreviousAndNext({
    previousAndNext,
    postType,
}: {
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
    postType: string;
}) {
    return (
        <>
            {previousAndNext.previous && (
                <SidebarPost post={previousAndNext.previous} previousOrNext="Previous" postType={postType} />
            )}
            {previousAndNext.next && (
                <SidebarPost post={previousAndNext.next} previousOrNext="Next" postType={postType} />
            )}
        </>
    );
}
