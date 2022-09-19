export interface AuthResponse{
    ok: boolean;
    uid?: string;
    email?: string;
    name?: string;
    token?: string;
    msg?: string;
}