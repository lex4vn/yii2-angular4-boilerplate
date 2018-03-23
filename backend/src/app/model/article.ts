export class Article{
    id:number;
    title:string;
    link:string;
    thumbnail:string;
    status:number;
    published_at:string;
    created_by:number;
    created_at:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
