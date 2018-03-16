export class Event {
    id:number;
    name:string;
    description:string;
    event_time:string;
    teacher_id:number;
    class_id:number;
    school_id:number;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
