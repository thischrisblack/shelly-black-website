import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
    getNetlifyEnhancedImage,
    ImageTransformations,
} from './image-path-helpers';

export enum BlogCategories {
    Gallery = 'Gallery',
    Library = 'Library & Archival Work',
    Photography = 'Photography',
    Internship = 'Internship',
}

export enum GalleryCategories {
    Other = 'Other Work',
    Personal = 'Personal Projects',
}

export interface IPost {
    content: string;
    excerpt?: string;
    frontmatter: IPostFrontmatter;
    ogImage?: string;
}

export interface IPostFrontmatter {
    category?: Array<string> | string;
    date?: string;
    description?: string;
    galleryImages?: Array<string>;
    id?: string;
    image?: string;
    private?: boolean;
    sortOrder?: number;
    title: string;
}

export interface IImageTransformation {
    h?: number;
    transformation?: ImageTransformations;
    w?: number;
}

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
                    post.category.includes(categoryFilter))
            );
        })
        .sort((a, b) => {
            if (
                (a.date || b.sortOrder || a.title) <
                (b.date || a.sortOrder || b.title)
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
                    post.category.includes(categoryFilter))
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
                  image: getNetlifyEnhancedImage(
                      data.image,
                      imageTransformation?.transformation,
                      imageTransformation?.w,
                      imageTransformation?.h
                  ),
              }
            : data;

    const contentWithCorrectedImgPath = content.replace(
        /images\//g,
        '/images/'
    );
    return {
        frontmatter: dataWithRootImageUrlAndTransformation as IPostFrontmatter,
        content: contentWithCorrectedImgPath,
        ogImage: getNetlifyEnhancedImage(
            data.image?.replace('../', ''),
            ImageTransformations.Smartcrop,
            1200,
            627
        ),
        excerpt: content.split('.')[0].replace(/(\r\n|\n|\r)/gm, '') + '.',
    };
};
