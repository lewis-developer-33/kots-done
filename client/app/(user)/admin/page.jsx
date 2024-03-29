'use client'
import { Button } from '@/components/ui/button'
import React,{useState} from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const page = () => {
    const username = localStorage.getItem('name')
    const [search,setSearch] = useState('')
    const [create,setCreate] = useState(true)
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
            <div className='flex items-start gap-4 w-[500px] my-2'>
                <Button>Create</Button>
            </div>
            <div className='grid gap-4 w-[500px] lg:w-[700px] lg:grid-cols-2'>
            {
                filteredNotices.map((d,i) => {
                    const {date,author,title} = d
                    return (
                        <Link href={`/admin/notices/${i}`} className='flex items-center justify-between text-orange-900 hover:text-white hover:bg-orange-900 font-sembold px-4 py-4 rounded-sm shadow-md ' key={i}>
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
        {create && (
            <div className='flex flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-slate-900/80'>
                <Card className='w-[350px]'>
                    <CardHeader>
                        <CardTitle>ClassCom -Noticeboard</CardTitle>
                        <CardDescription>Create notice</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-3'>
                    {/* title,message,file,course,sem,school,college */}
                        <Input 
                        name='title'
                        placeholder="Title"
                        className='w-full'
                        
                        />
                        <Input 
                        name='message'
                        placeholder="Message"
                        className='w-full'
                        
                        />
                        <Input 
                        type='file'
                        name='file'
                        className='w-full'
                        />
                        <Select >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="College" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                            <SelectItem value="Class Representative">Class Rep</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                        </Select>
                        <Select >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="School" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                            <SelectItem value="Class Representative">Class Rep</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                        </Select>
                        <Select >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                            <SelectItem value="Class Representative">Class Rep</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                        </Select>
                        <Select >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                            <SelectItem value="Class Representative">Class Rep</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                        </Select>

                    </CardContent>
                    <CardFooter className='flex gap-2 items-start font-semibold'>
                        <Button onClick=''>Create</Button>
                        <Button onClick={() => setCreate(false)} variant='destructive'>Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
        )}
    </>
  )
}

export default page