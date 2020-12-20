import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface IPost {
    id: string;
    title: string;
    date?: string;
    image?: string;
    galleryImages?: Array<string>;
}

export const blogDirectory = path.join(process.cwd(), 'content/blog');
export const pagesDirectory = path.join(process.cwd(), 'content/pages');
export const galleriesDirectory = path.join(process.cwd(), 'content/galleries');

export const getAllIds = (directory: string): Array<string> => {
    const fileNames = fs.readdirSync(directory);
    return fileNames.map((fileName) => {
        return fileName.replace(/\.md$/, '');
    });
};

export const getSortedPostData = (directory: string): Array<IPost> => {
    // Get file names under /posts
    const fileNames = fs.readdirSync(directory);

    const allPostsData: Array<IPost> = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');
        // Read markdown file as string
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        // Use gray-matter to parse the metadata section
        const matterResult = matter(fileContents);

        // Return the post
        return {
            id,
            ...(matterResult.data as {
                date?: string;
                title: string;
                images?: Array<string>;
            }),
            body: matterResult.content,
        };
    });

    // Sort posts by date or title
    return allPostsData.sort((a, b) => {
        if ((a.date || a.title) < (b.date || b.title)) {
            return 1;
        } else {
            return -1;
        }
    });
};

// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content)
//   const contentHtml = processedContent.toString()

//   // Combine the data with the id and contentHtml
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data
//   }
// }
