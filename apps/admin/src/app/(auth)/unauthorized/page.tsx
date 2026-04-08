"use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
    const { signOut } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>You do not have an access!</h1>
            <button className="rounded-sm m-4 p-2 bg-red-500" onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default Page;