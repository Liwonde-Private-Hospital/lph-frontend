"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession,sessionOptions } from "./lib";
import { redirect } from "next/navigation";
import { SessionData } from "./types";

// Function to get the session
export const getSession = async (userDepartment: string) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions(userDepartment));
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
};

// Function to handle login
export const login = async (userDepartment: string) => {
    const session = await getSession(userDepartment);
    if (userDepartment) {
        session.role = userDepartment;
        session.isLoggedIn = true;
        await session.save();
        redirect(`/departments/${userDepartment}/Dashboard`);
    } else {
        session.isLoggedIn = false;
        console.log("User is not authenticated. Redirecting to login.");
        redirect("/login");
    }
};

// Function to handle logout
export const logout = async (userDepartment: string) => {
    const session = await getSession(userDepartment);
    session.destroy();
    redirect("/login");
};
