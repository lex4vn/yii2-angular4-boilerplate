export class Clazz{
    id:number;
    name:string;
    description:string;
    teacher_id:number;
    teacher_name:string;
    school_id:number;
    school_name:string;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
