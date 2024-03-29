'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter,usePathname } from 'next/navigation'
import Link from 'next/link'


const UserLayout = ({children}) => {
    const username = localStorage.getItem("name")
    const pathName = usePathname()
    const router = useRouter()
    const homeLink = pathName.includes("student") ? '/student' : pathName.includes("lecturer") ? '/lecturer' : "/admin"
  return (
    <div>
        <header className='flex items-center justify-between font-semibold text-lg shadow-md  py-4 px-8 sticky'>
            <Link href={homeLink}>E-Noticeboard</Link>

            {
                username == null ? <Button>Log in</Button> : <div className='rounded-full p-4 bg-slate-900 text-white text-xl h-10 w-10 flex flex-col items-center justify-center'>{username[0]}</div>
            }
            <Button onClick={() => {
                localStorage.clear()
                router.push("/auth/login")

            }} variant='destructive'>Log Out</Button>
        </header>
        <section className='flex flex-col items-center my-2 '>
            {children}
        </section>
    </div>
  )
}

export default UserLayout