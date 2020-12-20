import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export enum BlogCategories {
    Photography = 'Photography',
    Library = 'Library',
}

export interface IPost {
    frontmatter: IPostFrontmatter;
    content: string;
}

export interface IPostFrontmatter {
    id?: string;
    title: string;
    date?: string;
    image?: string;
    galleryImages?: Array<string>;
    category?: string;
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

export const getPostFrontmatterList = (
    directory: string,
    categoryFilter?: BlogCategories
): Array<IPostFrontmatter> => {
    const fileNames = fs.readdirSync(directory);

    const allPostFrontmatter: Array<IPostFrontmatter> = fileNames.map(
        (fileName) => {
            const id = fileName.replace(/\.md$/, '');
            const postData: IPost = getSinglePost(id, directory);

            return {
                id,
                ...postData.frontmatter,
            };
        }
    );

    return allPostFrontmatter
        .filter((post) => {
            return (
                !categoryFilter ||
                !post.category ||
                post.category === categoryFilter
            );
        })
        .sort((a, b) => {
            if ((a.date || a.title) < (b.date || b.title)) {
                return 1;
            } else {
                return -1;
            }
        });
};

export const getSinglePost = (id: string, directory: string): IPost => {
    const fullPath = path.join(directory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        frontmatter: data as IPostFrontmatter,
        content: content,
    };
};
