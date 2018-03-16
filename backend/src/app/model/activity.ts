export class Activity{
    id:number;
    title:string;
    teacher_id:number;
    class_id:number;
    status:number;
    created_at:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}