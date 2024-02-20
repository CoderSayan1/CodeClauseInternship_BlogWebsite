"use client";

import {SessionProvider} from "next-auth/react";

// @ts-ignore
export default function AuthProvider({children}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}