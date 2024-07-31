// types.d.ts
import { IronSession } from 'iron-session';

export interface SessionData {
    isLoggedIn?: boolean;
    role?: string;
    fullName?: string;
}

export type CustomIronSession = IronSession & SessionData;
