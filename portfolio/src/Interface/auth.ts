export interface Login{
    username:string;
    password:string;
}

export interface LoginResponse{
    token:{
        refreshToken:string;
        accessToken:string;
        expiresIn: number;
        tokenType: string;
        createdAt: string;
        
    };
    user_name:string;
    user_id:string;
}

