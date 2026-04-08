import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-600 p-8 rounded-lg">
            <div className="flex flex-col gap-4 items-center md:items-start">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="IbkShop" width={36} height={36}/>
                    <p className="hidden md:block text-md font-medium tracking-wider text-white">OPSYCART.</p>
                </Link>
                <p className="text-sm text-gray-300">© 2026 KobiTech.</p>
                <p className="text-sm text-gray-300">All rights reserved.</p>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-300 items-center md:items-start">
                <p className="text-sm text-amber-50">Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Terms of Service</Link>
                <Link href="/">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-300 items-center md:items-start">
                <p className="text-sm text-amber-50">Products</p>
                <Link href="/">Sale</Link>
                <Link href="/">New Arrivals</Link>
                <Link href="/">Best Sellers</Link>
                <Link href="/">All Products</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-300 items-center md:items-start">
                <p className="text-sm text-amber-50">Company</p>
                <Link href="/">Blog</Link>
                <Link href="/">About</Link>
                <Link href="/">Sitemap</Link>
                <Link href="/">Affiliate Program</Link>
            </div>
        </div>
    )
}

export default Footer