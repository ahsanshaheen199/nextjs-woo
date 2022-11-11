export type Category = {
    id: number;
    name: string;
    slug: string;
    count: number;
    image: CategoryImage;
}

export type CategoryImage = {
    id: number;
    src: string;
    alt: string;
}

export type CategoryTree = Category & {
    children: Category[]
}