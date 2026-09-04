import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home } from "lucide-react"
import ShoppingCartIcon from "./ShoppingCartIcon"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import ProfileButton from "./ProfileButton"

const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
            {/* LEFT */}
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="OpsyCart"
                    width={36}
                    height={36}
                    className="w-6 h-6 md:w-9 md:h-9"
                />
                <p className="hidden md:block text-md font-medium tracking-wider">OPSYCART.</p>
            </Link>
            {/* RIGHT */}
            <div className="flex items-center gap-6">
                <Suspense fallback={<div className="hidden sm:block w-32 h-8 bg-gray-100 rounded-md animate-pulse" />}>
                    <SearchBar />
                </Suspense>
                <Link href="/">
                    <Home className="w-4 h-4 text-gray-600" />
                </Link>
                <Bell className="w-4 h-4 text-gray-600" />
                <ShoppingCartIcon />
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <ProfileButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default Navbar;