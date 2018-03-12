export class Event {
    id:number;
    title:string;
    description:string;
    schedule_time:string;
    teacher_id:number;
    class_id:number;
    school_id:number;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
