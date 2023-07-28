import { BadRegister, InvalidJWT, LoginBadCredentials } from "./auth.interface";
import { User } from "./user.interface";

export interface AuthUser {
    authState:States;
    user:User | null;
    token:string | null;
    errors: BadRegister | LoginBadCredentials | InvalidJWT | null;
}

export enum States  {
   Checking = 'checking',
   NotAuthenticated = 'not-authenticated',
   Authenticated = 'authenticated'
}