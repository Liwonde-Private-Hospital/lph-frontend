"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, sessionOptions } from "./lib";
import { redirect } from "next/navigation";
import { SessionData } from "./types";

// Function to get the session data as a plain object
const getSessionData = async (userDepartment: string): Promise<SessionData> => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions(userDepartment));
    return {
        isLoggedIn: session.isLoggedIn || defaultSession.isLoggedIn,
        fullName: session.fullName,
        role: session.role
    };
};

// Function to handle login
export const login = async (fullName: string, userDepartment: string): Promise<void> => {
    if (!userDepartment) {
        console.log("User is not authenticated. Redirecting to login.");
        redirect("/login");
        return;
    }

    const session = await getIronSession<SessionData>(cookies(), sessionOptions(userDepartment));
    session.fullName = fullName;
    session.role = userDepartment;
    session.isLoggedIn = true;
    await session.save();

    // Redirect to the user department's dashboard
    redirect(`/departments/${userDepartment}/Dashboard`);
};

// Function to handle logout
export const logout = async (userDepartment: string): Promise<void> => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions(userDepartment));
    session.destroy();
    redirect("/login");
};

// Export a function to get the session data for use in client components
export const getSession = async (userDepartment: string): Promise<SessionData> => {
    return getSessionData(userDepartment);
};
