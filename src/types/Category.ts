export type Category = {
    id: number;
    name: string;
    slug: string;
}

export type CategoryTree = Category & {
    children: Category[]
}