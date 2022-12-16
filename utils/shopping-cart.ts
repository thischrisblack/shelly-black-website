import { IIndex } from './types';

export interface IShopItem {
    description: string;
    details: Array<string>;
    id: string;
    image: string;
    imageAlt: string;
    estimatedInStockDate: string;
    price: number;
    quantity: number;
    shortDescription: string;
    title: string;
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
        estimatedInStockDate: null,
    },
    'dog-archivist-pin': {
        id: 'dog-archivist-pin',
        quantity: 0,
        title: 'Dog Archivist Pin',
        description: `
            <p>
                Do you work in barkives and are a dog parent? If so, treat yourself to this enamel pin of a dog in an archival storage box.
            </p>
            <p>
                Not only is this a fetching gift idea for an archivist, but librarians or historians, too.
            </p>
            <p>
                Limited supply available. Order before they're doggone!
            </p>        
        `,
        shortDescription: `
        <p>
            Do you work in barkives and are a dog parent? If so, treat yourself to this enamel pin of a dog in an archival storage box.
        </p>
        `,
        price: 14.99,
        details: ['1 x 1.25 inches', 'black metal finish', 'black rubber clutch'],
        image: 'dog_pin_pencil_1.jpg',
        imageAlt: 'Enamel pin with smiling doggy sitting in an archival box with the lid open.',
        estimatedInStockDate: null,
    },
};
