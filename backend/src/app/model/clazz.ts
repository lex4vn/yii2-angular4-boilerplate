export class Clazz{
    id:number;
    name:string;
    description:string;
    teacher_id:number;
    school_id:number;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
