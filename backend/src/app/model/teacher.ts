export class Teacher{
    id:number;
    username:string;
    full_name:string;
    email:string;
    password:string;
    role:number;
    role_label:string;
    last_login_at:string;
    last_login_ip:string;
    confirmed_at:string;
    blocked_at:string;
    status:number;
    status_label:string;
    created_at:string;
    updated_at:string;

    permissions:TeacherPermission[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


export class TeacherPermission{
    name:string;
    description:string;
    checked:boolean;
}