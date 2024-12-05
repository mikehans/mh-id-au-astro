export interface Article {
    id: string;
    slug: string;
    body: string;
    collection: string;
    data: {
        title: string;
        date: Date;
        imageUrl: string;
        description: string;
        author: string;
        type: string;
        tags:Array<string> | {tag: string, tagSorting: string};
        publish: boolean;
    }
}