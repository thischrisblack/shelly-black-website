import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

enum ContentDirectories {
    Blog = 'content/blog',
    Galleries = 'content/galleries',
    Pages = 'content/pages',
}

export const contentPaths = {
    blog: path.join(process.cwd(), ContentDirectories.Blog),
    pages: path.join(process.cwd(), ContentDirectories.Pages),
    galleries: path.join(process.cwd(), ContentDirectories.Galleries),
};

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

export const getAllIds = (directoryPath: string): Array<string> => {
    const fileNames = fs.readdirSync(directoryPath);
    return fileNames.map((fileName) => {
        return fileName.replace(/\.md$/, '');
    });
};

export const getAllPostFrontmatter = (
    directoryPath: string,
    categoryFilter?: BlogCategories
): Array<IPostFrontmatter> => {
    const fileNames = fs.readdirSync(directoryPath);

    const allPostFrontmatter: Array<IPostFrontmatter> = fileNames.map(
        (fileName): IPostFrontmatter => {
            const id = fileName.replace(/\.md$/, '');
            const { frontmatter }: IPost = getSinglePost(id, directoryPath);

            return {
                id,
                ...frontmatter,
            };
        }
    );

    // Return post frontmatter array filtered by category and sorted by date or title
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

export const getSinglePost = (id: string, directoryPath: string): IPost => {
    const fullPath = path.join(directoryPath, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        frontmatter: data as IPostFrontmatter,
        content: content,
    };
};
