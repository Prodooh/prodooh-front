import { User } from "src/app/core/interfaces/user";

export interface Token {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    user: User;
}