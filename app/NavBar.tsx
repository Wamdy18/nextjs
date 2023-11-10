'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

const nav = [
    {label: 'О нас', href: "/about"},
    {label: 'Оплата', href: "/how-payment"},
    {label: 'Доставка', href: "/delivery"},
    {label: 'Контакты', href: "/contacts"},
]
const NavBar = () => {
    const pathName = usePathname();
    const session = useSession();
    console.log(session.data);
  return (
    <nav className='flex py-5 px-10 items-center'>
        <Link href="/">
            <Image height={100} width={130} src='/logo.png' alt="logo" />
        </Link>
        <ul className='flex ml-32 gap-6'>
            {nav.map((el) => <li key={el.href}>
                <Link href={el.href}
                className={`${pathName === el.href ? 'text-neutral-700' : 'text-neutral-400'} hover:text-neutral-500 transition-colors`}
                >{el.label}</Link>
            </li>)}
            {(session?.data?.user?.email == "79527386291kot@gmail.com" || session?.data?.user?.name === 'admin') && (
                <li><Link href='/items/new'  className={`${pathName === '/items/new' ? 'text-neutral-700' : 'text-neutral-400'} hover:text-neutral-500 transition-colors`}>Создать товар</Link></li>
            ) }
            {session?.data ? (
                <li><Link href="#" onClick={() => {signOut({callbackUrl: "/"})}}>Выйти</Link></li>
            ) : (<li><Link href='api/auth/signin'>Авторизоваться</Link></li>)}
        </ul>
        
    </nav>
  )
}

export default NavBar