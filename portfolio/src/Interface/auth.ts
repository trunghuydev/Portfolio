export interface Login{
    username:string;
    password:string;
}

export interface LoginResponse{
    token:{
        refreshToken:string;
        accessToken:string;
        expiresIn: number;
        tokenType?: string;
        createdAt: string;
        
    };
    user_name:string;
    user_id:string;
    email:string;
}

export interface DevRegisterPayload {
    username: string;
    email?: string;
    password: string;
}

export interface DevRegisterResponse {
    userId: string;
}

export interface RefreshTokenPayload {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    createdAt: string;
}

export interface TokenClaims {
    sub: string;
    name: string;
    email: string;
    jti: string;
    exp: string;
    iat: string;
}

