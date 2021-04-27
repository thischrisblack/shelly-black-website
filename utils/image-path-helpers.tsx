// Netlify image transformation "nf_resize=<x>" values
export enum ImageTransformations {
    Fit = 'fit',
    Smartcrop = 'smartcrop',
}

export const getNetlifyEnhancedImage = (path: string, transformation?: string, w?: number, h?: number): string => {
    if (!path) {
        return null;
    }
    // If no transformation.
    if (!transformation) {
        // Return URL without transform.
        return `${path}`;
    }

    // If transformation provided, but missing arguments.
    if (transformation && !w && !h) {
        console.error('Missing required width or height arguments. Transform aborted.');
        // Return URL without transform.
        return `${path}`;
    }

    // If smartcrop transformation provided, but missing arguments.
    if (transformation === ImageTransformations.Smartcrop && (!w || !h)) {
        console.error('Netlify smartcrop requires both width and height arguments. Transform aborted.');
        // Return URL without transform.
        return `${path}`;
    }

    // Build query string
    const imageTransformQueryString = `?nf_resize=${transformation}` + (w ? `&w=${w}` : '') + (h ? `&h=${h}` : '');

    // Return full URL with query string.
    return `${path}${imageTransformQueryString}`;
};
