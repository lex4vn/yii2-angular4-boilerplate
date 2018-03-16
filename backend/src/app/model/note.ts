export class Note {
    id:number;
    schedule_id:number;
    kid_id:number;
    teacher_id:number;
    note:string;
    created_at:string;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
