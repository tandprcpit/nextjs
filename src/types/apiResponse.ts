import {User} from '@/model/User'



export interface ApiResponse{
    success:boolean;
    message?:string;
    user?:User
}