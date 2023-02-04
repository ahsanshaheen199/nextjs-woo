export type Post = {
    id: number;
    modified: Date | string;
    title: {
        rendered: string;
    },
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia': {
            source_url: string
        }[]
    }
}

export type Media = {
    source_url: string;
}