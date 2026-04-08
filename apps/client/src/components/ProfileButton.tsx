"use client";

import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
    const router = useRouter();
	return (
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Action 
                    label= "See Orders"
                    labelIcon= {<ShoppingBag className="w-3 h-3"/>}
                    onClick={() => router.push("/orders")}
                />
            </UserButton.MenuItems>
        </UserButton>
    )
}

export default ProfileButton;