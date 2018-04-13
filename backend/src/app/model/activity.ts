export class Activity{
    id:number;
    title:string;
    teacher_id:number;
    class_id:number;
    status:number;
    created_at:string;
    images:[string];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}