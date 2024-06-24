import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const navlinks = [{ name: "Home", herf: "/" },{ name: "Upload", herf: "/upload" }]
    return (
        <nav className='flex justify-between z-50 text-white items-center py-4 px-6 sticky top-0 bg-black/45  backdrop-blur-md'>
            <h1>Blog App</h1>
            <ul className='flex gap-3'>
                {navlinks.map((v,i) => (
                    <li>
                        <Link href={v.herf}>
                            {v.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
