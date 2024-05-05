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
    shipping: {
        divisor: number; // Divide item quantity by this, and then ...
        price: number; // ... multiply by price.
    };
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
        shipping: {
            divisor: 4,
            price: 5,
        },
    },
    'cat-archivist-sticker': {
        id: 'cat-archivist-sticker',
        quantity: 0,
        title: 'Cat Archivist Sticker',
        description: `
            <p>
                If you enjoy archival purrrocessing and love cats, this sticker is just fur you! It features a kitty in an archival storage box.
            </p>
            <p>
                Limited quantity available. Purrchase while supplies last.
            </p>     
        `,
        shortDescription: `
            <p>
                If you enjoy archival purrrocessing and love cats, this sticker is just fur you! It features a kitty in an archival storage box.
            </p>
        `,
        price: 4.99,
        details: ['Weather-proof vinyl', '3 inches wide'],
        image: 'cat_archivist_sticker.jpg',
        imageAlt:
            'Vinyl sticker with smiling kitty sitting in an archival box with the lid open. The caption says Purrrrocessing.',
        estimatedInStockDate: null,
        shipping: {
            divisor: 1,
            price: 0,
        },
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
        shipping: {
            divisor: 4,
            price: 5,
        },
    },
    'dog-archivist-sticker': {
        id: 'dog-archivist-sticker',
        quantity: 0,
        title: 'Dog Archivist Sticker',
        description: `
            <p>
                Do you work in barkives? Show your fellow archivists, librarians, or conservators howl much you love dogs with this sticker. It features a puppy in an archival storage box.
            </p>
            <p>
                Limited quantity available. Purchase before they're doggone!
            </p>     
        `,
        shortDescription: `
            <p>
                Do you work in barkives? Show your fellow archivists, librarians, or conservators howl much you love dogs with this sticker.
            </p>
        `,
        price: 4.99,
        details: ['Weather-proof vinyl', '3 inches wide'],
        image: 'dog_archivist_sticker.jpg',
        imageAlt:
            'Vinyl sticker with smiling doggy sitting in an archival box with the lid open. The caption says In the barkives.',
        estimatedInStockDate: null,
        shipping: {
            divisor: 1,
            price: 0,
        },
    },
    'cat-floppy-pin': {
        id: 'cat-floppy-pin',
        quantity: 0,
        title: 'Cat & Floppy Disk Pin',
        description: `
            <p>
                Feeling nostalgic for floppy disks? This enamel pin features a cat holding a 1.44 megabite floppy disk 
                furmatted as FAT12. The purrfect gift for a digital archivist, software developer, or technologist.
            </p>
            <p>Available for purrchase while supplies last!</p>
        `,
        shortDescription: `
            <p>
                Feeling nostalgic for floppy disks? This enamel pin features a cat holding a 1.44 megabite floppy disk 
                furmatted as FAT12. The purrfect gift for a digital archivist, software developer, or technologist.
            </p>
        `,
        price: 14.99,
        details: ['0.625 x 1.25 inches', 'black metal finish', 'black rubber clutch'],
        image: 'cat_floppy_disk_pin.jpg',
        imageAlt: 'Enamel pin with smiling orange tabby kitty sitting holding a floppy disk in its mouth.',
        estimatedInStockDate: null,
        shipping: {
            divisor: 4,
            price: 5,
        },
    },
    'cat-floppy-sticker': {
        id: 'cat-floppy-sticker',
        quantity: 0,
        title: 'Cat & Floppy Disk Sticker',
        description: `
            <p>
                This sticker features a cat holding a 1.44 megabite floppy disk furmatted as FAT12. The purrfect gift 
                for a digital archivist, software developer, or technologist.
            </p>
            <p>
                Limited quantity available. Purrchase while supplies last.
            </p>     
        `,
        shortDescription: `
            <p>
                This sticker features a cat holding a 1.44 megabite floppy disk furmatted as FAT12. The purrfect gift 
                for a digital archivist, software developer, or technologist.
            </p>
        `,
        price: 4.99,
        details: ['Weather-proof vinyl', '3 inches wide'],
        image: 'cat_floppy_disk_sticker_photo.jpg',
        imageAlt: 'Vinyl sticker with smiling orange tabby kitty sitting holding a floppy disk in its mouth.',
        estimatedInStockDate: null,
        shipping: {
            divisor: 1,
            price: 0,
        },
    },
};
