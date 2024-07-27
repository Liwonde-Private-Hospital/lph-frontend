import { SessionOptions } from "iron-session";
import { SessionData } from "./types";

export const defaultSession: SessionData = {
    isLoggedIn:false
}
export const sessionOptions = (userDepartment: string): SessionOptions => {
    return {
        password: process.env.SECRET_KEY!,
        cookieName: `${userDepartment}`,
        cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }
    };
};
