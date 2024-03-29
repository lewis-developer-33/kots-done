'use client'
import { Button } from '@/components/ui/button'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
    const [create,setCreate] = useState(false)
    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')
    const [college,setCollege] = useState('')
    const [school,setSchool] = useState('')
    const [course,setCourse] = useState('')
    const [semester,setSemester] = useState('')

    const [data1,setData1] = useState([])
    const [data2,setData2] = useState([])
    const [data3,setData3] = useState([])
    const [data4,setData4] = useState([])
    const [data5,setData5] = useState([])

    const {toast} = useToast()
    const id = localStorage.getItem('userId')

    useEffect(() => {
        const fetchStuff = async () => {
            const res = await axios.get("http://localhost:8000/courses")
            setData1(res.data.message)
            
            const res2 = await axios.get("http://localhost:8000/sem")
            setData2(res2.data.message)

            const res3 = await axios.get("http://localhost:8000/school")
            setData3(res3.data.message)

            const res4 = await axios.get("http://localhost:8000/college")
            setData4(res4.data.message)

            const res5 = await axios.get(`http://localhost:8000/notices/${id}`)
            setData5(res5.data.message)
        }
        fetchStuff()
    },[])

    

    const handleSubmit = async () => {
        const notice = {
            title,
            message,
            college,
            course,
            school,
            sem:semester
        }
        
        const res = await axios.post(`http://localhost:8000/notice/${id}`,notice)
        console.log(res)
        if (res.data.message){
            toast({
                title:res.data.message
            })
        }
        if (res.data.error){
            toast({
                variant:'destructive',
                title:res.data.error
            })
        }
    }
    const filteredNotices = search.length > 3 ? data5.filter((d) => {
        const titleTerm = d.title.toLowerCase()
        const searchTerm = search.toLowerCase()
        return (titleTerm.includes(searchTerm))
    }) : data5
  return (
    <>
        
        <>
            <Input
            placeholder='Search'
            className='w-[500px] font-semibold my-2'
            onChange = {(e) => setSearch(e.target.value)}
            />
            <div className='flex items-start gap-4 w-[500px] my-2'>
                <Button onClick={() => setCreate(true)}>Create</Button>
            </div>
            <div className='grid gap-4 w-[500px] lg:w-[700px] lg:grid-cols-2'>
            {
                filteredNotices.map((d,i) => {
                    const {updatedAt,author,title} = d
                    return (
                        <Link href={`/admin/notices/${i}`} className='flex items-center justify-between text-orange-900 hover:text-white hover:bg-orange-900 font-sembold px-4 py-4 rounded-sm shadow-md ' key={i}>
                            <h2 className='font-semibold'>
                                {title}
                            </h2>
                            <div>
                                <h2 className='font-semibold'>
                                    {author}
                                </h2>
                                <span className='text-sm font-semibold'>{updatedAt}</span>
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
                        onChange={(e) => setTitle(e.target.value)}
                        
                        />
                        <Input 
                        name='message'
                        placeholder="Message"
                        className='w-full'
                        onChange={(e) => setMessage(e.target.value)}
                        
                        />
                        <Input 
                        type='file'
                        name='file'
                        className='w-full'
                        />
                        <Select  onValueChange={(value) => setCollege(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="College" />
                        </SelectTrigger>
                        <SelectContent>
                            {data4.map((d,i) => (
                                <SelectItem key={i} value={d.title}>{d.title}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>

                        <Select  onValueChange={(value) => setSchool(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="School" />
                        </SelectTrigger>
                        <SelectContent>
                        {data3.map((d,i) => (
                                <SelectItem key={i} value={d.title}>{d.title}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>

                        <Select  onValueChange={(value) => setCourse(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                            {data1.map((d,i) => (
                                <SelectItem key={i} value={d.title}>{d.title}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>

                        <Select  onValueChange={(value) => setSemester(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                        {data2.map((d,i) => (
                                <SelectItem key={i} value={d.title}>{d.title}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>

                    </CardContent>
                    <CardFooter className='flex gap-2 items-start font-semibold'>
                        <Button onClick={handleSubmit}>Create</Button>
                        <Button onClick={() => setCreate(false)} variant='destructive'>Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
        )}
    </>
  )
}

export default page