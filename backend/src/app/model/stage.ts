export class Stage{
    id:number;
    kid_id:number;
    kid_name:string;
    class_id:number;
    status:number;
    status_name:string;
    commented_at:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}