export class Note {
    id:number;
    schedule_id:number;
    schedule_title:string;
    kid_id:number;
    kid_name:string;
    teacher_id:number;
    teacher_name:string;
    note:string;
    created_at:string;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
