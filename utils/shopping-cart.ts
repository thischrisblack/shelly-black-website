import { IIndex } from './types';

export interface IShopItem {
    id: string;
    quantity: number;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    details: Array<string>;
    image: string;
    imageAlt: string;
}

export const inventory: IIndex<IShopItem> = {
    'cat-archivist-pin': {
        id: 'cat-archivist-pin',
        quantity: 0,
        title: 'Cat Archivist Pin',
        description: `
            <p>
                Are you a purrrocessing archivist? If so, you'll want to get your paws on this enamel
                pin of a kitty in an archival storage box.
            </p>
            <p>
                This is also the purrfect gift for the archivist, librarian, or historian in your life
                who loves cats.
            </p>
            <p>Available for purrchase while supplies last!</p>
        `,
        shortDescription: `
            <p>
                Are you a purrrocessing archivist? If so, you'll want to get your paws on this enamel
                pin of a kitty in an archival storage box.
            </p>
        `,
        price: 14.99,
        details: ['1 x 1.25 inches', 'black metal finish', 'black rubber clutch'],
        image: 'cat_pin_pencil_1.jpg',
        imageAlt: 'Enamel pin with smiling gray kitty sitting in an archival box with the lid open.',
    },
};
