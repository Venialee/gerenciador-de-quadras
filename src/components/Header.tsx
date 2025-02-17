'use client'

import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href="/">Home</Link>
            <Link href="/admin">Admin</Link>
        </header>
    )
}