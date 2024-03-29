'use client'
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EllipsisVerticalIcon, OptionIcon } from 'lucide-react'
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
    const username = "Lewis"
    const notice = {
        title:"Mind Control",
        author:"Kots Atieno",
        message:"Whats up the world is going crazy"
    }
    const comments =[
        {
            message:"I liked the book",
            author:"Mike Tyson"
        },
        {
            message:"I liked the book",
            author:"Mike Tyson"
        },
        {
            message:"I liked the book",
            author:"Mike Tyson"
        },
        {
            message:"I liked the book",
            author:"Mike Tyson"
        },
    ]

    const [options,setOptions] = useState(true)
    return (
    <>
        
        <>
            <div className='w-[500px] lg:w-[700px] grid gap-4'>

                <div className='my-4 flex items-center w-[500px] justify-between'>
                    <div>
                        <h2 className='font-semibold text-2xl'>{notice.title}</h2>
                        <h2 className='font-semibold text-xs'>By {notice.author}</h2>
                    </div>
                    <div>
                        <EllipsisVerticalIcon onClick={() => setOptions(true)} className='cursor-pointer'/>
                    </div>
                </div>
                <div className='font-semibold tracking-wider text-black/90 indent-2'>
                    {notice.message}
                    <div className='flex items-end gap-2 tracking-normal'>
                    </div>
                </div>

                <div className='fixed  border-2 p-8 right-0 w-[400px]'>
                    
                    <div className='w-[400px] h-[800px]'>
                        <h2 className='font-semibold text-xl'>Class comments</h2>
                        <div className='grid gap-4'>
                            {comments.map((d,i) => {
                                const {message,author} = d
                                return (
                                <div key={i} className='bg-orange-900/60 text-white p-4 font-semibold relative'>
                                    <p>{message}</p>
                                    <span className='text-xs flex '>{author}</span>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
        {options && (
            <div className='flex flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-slate-900/80'>
                <Card className='w-[350px]'>
                    <CardHeader>
                        <CardTitle>ClassCom -Noticeboard</CardTitle>
                        <CardDescription>Edit notice</CardDescription>
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
                        <Button onClick=''>Update</Button>
                        <Button onClick={() => setOptions(false)} variant='outline'>Cancel</Button>
                        <Button onClick='' variant='destructive'>Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        )}
    </>
  )
}

export default page