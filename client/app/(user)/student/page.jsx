'use client'
import { Button } from '@/components/ui/button'
import React,{useState} from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const page = () => {
    const username = localStorage.getItem('name')
    const [search,setSearch] = useState('')
    const notices = [
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
        {
            title:'Mind control',
            author:'Lewis',
            date:"5-10"
        },
    ]
    const filteredNotices = search.length > 3 ? notices.filter((d) => {
        const titleTerm = d.title.toLowerCase()
        const searchTerm = search.toLowerCase()
        return (titleTerm.includes(searchTerm))
    }) : notices
  return (
    <>
        <>
            <Input
            placeholder='Search'
            className='w-[500px] font-semibold my-2'
            onChange = {(e) => setSearch(e.target.value)}
            />
            <div className='grid gap-4 w-[500px]'>
            {
                filteredNotices.map((d,i) => {
                    const {date,author,title} = d
                    return (
                        <Link href={`/student/notices/${i}`} className='flex items-center justify-between text-orange-900 hover:text-white hover:bg-orange-900 font-sembold px-4 py-4 rounded-sm shadow-md ' key={i}>
                            <h2 className='font-semibold'>
                                {title}
                            </h2>
                            <div>
                                <h2 className='font-semibold'>
                                    {author}
                                </h2>
                                <span className='text-sm font-semibold'>{date}</span>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        </>
    </>
  )
}

export default page