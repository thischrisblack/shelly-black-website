export enum ImageTransformations {
    Fit = 'fit',
    Smartcrop = 'smartcrop',
}

export const getImagePath = (
    path: string,
    transformation?: string,
    w?: number,
    h?: number
): string => {
    let imageTransformQueryString = '';
    if (transformation) {
        imageTransformQueryString += '?nf_resize=' + transformation;
    }
    if (w) {
        imageTransformQueryString += '&w=' + w;
    }
    if (h) {
        imageTransformQueryString += '&h=' + h;
    }
    return (process.env.ROOT_IMG_URL || '') + path + imageTransformQueryString;
};
