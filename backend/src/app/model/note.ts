export class Note {
    schedule_id:number;
    kid_id:number;
    note:string;
    created_at:string;
    status:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
