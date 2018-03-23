export class Parent {
    id:number;
    username:string;
    email:string;
    password:string;
    last_login_at:string;
    last_login_ip:string;
    confirmed_at:string;
    blocked_at:string;
    status:number;
    status_label:string;
    created_at:string;
    updated_at:string;
    kid_id: number;
    avatar: string;
    class_id: number;
    class_name: string;
    full_name: string;
    kid_name: string;
    kid_avatar: string;
    phone: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}