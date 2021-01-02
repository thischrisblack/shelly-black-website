import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from './get-absolute-image-path';

enum ContentDirectories {
    Blog = 'content/blog',
    Galleries = 'content/galleries',
    Pages = 'content/pages',
}

export const contentPaths = {
    blog: path.join(process.cwd(), ContentDirectories.Blog),
    galleries: path.join(process.cwd(), ContentDirectories.Galleries),
    pages: path.join(process.cwd(), ContentDirectories.Pages),
};

export enum BlogCategories {
    Photography = 'Photography',
    Library = 'Library & Archival Work',
    Gallery = 'Gallery',
}

export enum GalleryCategories {
    Personal = 'Personal Projects',
    Other = 'Other Work',
}

export interface IPost {
    frontmatter: IPostFrontmatter;
    content: string;
    ogImage?: string;
    excerpt?: string;
}

export interface IPostFrontmatter {
    id?: string;
    title: string;
    date?: string;
    image?: string;
    galleryImages?: Array<string>;
    category?: string;
    private?: boolean;
    sortOrder?: number;
}

export interface IImageTransformation {
    transformation?: ImageTransformations;
    w?: number;
    h?: number;
}

export const getAllIds = (directoryPath: string): Array<string> => {
    const fileNames = fs.readdirSync(directoryPath);
    return fileNames.map((fileName) => {
        return fileName.replace(/\.md$/, '');
    });
};

export const getAllPostFrontmatter = (
    directoryPath: string,
    categoryFilter?: BlogCategories,
    imageTransformation?: IImageTransformation
): Array<IPostFrontmatter> => {
    const fileNames = fs.readdirSync(directoryPath);

    const allPostFrontmatter: Array<IPostFrontmatter> = fileNames.map(
        (fileName): IPostFrontmatter => {
            const id = fileName.replace(/\.md$/, '');
            const { frontmatter }: IPost = getSinglePost(
                id,
                directoryPath,
                imageTransformation
            );

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
                !post.private &&
                (!categoryFilter ||
                    !post.category ||
                    post.category === categoryFilter)
            );
        })
        .sort((a, b) => {
            if (
                (a.date || a.sortOrder || a.title) <
                (b.date || b.sortOrder || b.title)
            ) {
                return 1;
            } else {
                return -1;
            }
        });
};

export const getPreviousAndNextFrontmatter = (
    currentPost: string,
    directoryPath: string,
    categoryFilter?: BlogCategories,
    imageTransformation?: IImageTransformation
): { previous: IPostFrontmatter; next: IPostFrontmatter } => {
    const fileNames = fs.readdirSync(directoryPath);

    const allPostFrontmatter: Array<IPostFrontmatter> = fileNames
        .map(
            (fileName): IPostFrontmatter => {
                const id = fileName.replace(/\.md$/, '');
                const { frontmatter }: IPost = getSinglePost(
                    id,
                    directoryPath,
                    imageTransformation
                );
                return {
                    id,
                    ...frontmatter,
                };
            }
        )
        .filter((post) => {
            return (
                !post.private &&
                (!categoryFilter ||
                    !post.category ||
                    post.category === categoryFilter)
            );
        })
        .sort((a, b) => {
            if ((a.date || a.title) < (b.date || b.title)) {
                return 1;
            } else {
                return -1;
            }
        });

    const currentIndex = allPostFrontmatter.findIndex(
        (post) => post.id === currentPost
    );

    return {
        previous: allPostFrontmatter[currentIndex + 1] || null,
        next: allPostFrontmatter[currentIndex - 1] || null,
    };
};

export const getSinglePost = (
    id: string,
    directoryPath: string,
    imageTransformation?: IImageTransformation
): IPost => {
    const fullPath = path.join(directoryPath, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    // Transform images if not gifs (to preserve animated gifs)
    const dataWithRootImageUrlAndTransformation =
        data.image && !data.image.includes('gif')
            ? {
                  ...data,
                  image: getAbsoluteImageUrl(
                      data.image,
                      imageTransformation?.transformation,
                      imageTransformation?.w,
                      imageTransformation?.h
                  ),
              }
            : data;

    return {
        frontmatter: dataWithRootImageUrlAndTransformation as IPostFrontmatter,
        content: content,
        ogImage: getAbsoluteImageUrl(
            data.image,
            ImageTransformations.Smartcrop,
            1200,
            627
        ),
        excerpt: content.split('.')[0].replace(/(\r\n|\n|\r)/gm, '') + '.',
    };
};
