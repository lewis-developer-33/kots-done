'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
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
  

const page = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [role,setRole] = useState('')
    const [course,setCourse] = useState('')
    const [sem,setSem] = useState('')

    const [data1,setData1] = useState([])
    const [data2,setData2] = useState([])

    useEffect(() => {
        const fetchStuff = async () => {
            const res = await axios.get("http://localhost:8000/courses")
            setData1(res.data.message)
            
            const res2 = await axios.get("http://localhost:8000/sem")
            setData2(res2.data.message)
        }
        fetchStuff()
    },[])

    const {toast} = useToast()

    const handleSubmit = async () => {
        const user = {name,email,pass,role}
        console.log(user)
        const res = await axios.post('http://localhost:8000/sign-up',user)
        if (res.data.message){
            toast({
                title:res.data.message
            })
            const {name,id,role} = res.data.message
            localStorage.setItem('name',name)
            localStorage.setItem('role',role)
            localStorage.setItem('userId',id)
            if (role == 'Student' || role == 'Class Rep' ) router.push('/student')
            else if (role == 'Lecturer') router.push('/lecturer')
            else if (role == 'Admin') router.push('/admin')
            else {
            toast({
                variant:'destructive',
                title:"Contact admin"
            })
            }
        }
        if (res.data.error){
            toast({
                variant:'destructive',
                title:res.data.error
            })
        }

    }

  return (
    <Card className='w-[350px]'>
        <CardHeader>
            <CardTitle>ClassCom -Noticeboard</CardTitle>
            <CardDescription>Enter your details to sign up</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-3'>
            <Input 
            name='name'
            placeholder="Name"
            className='w-full'
            onChange={(e) => setName(e.target.value)}
            />
            <Input 
            name='email'
            placeholder="Email"
            className='w-full'
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
            name='password'
            placeholder="Password"
            className='w-full'
            onChange={(e) => setPass(e.target.value)}
            />
            <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Lecturer">Lecturer</SelectItem>
                <SelectItem value="Class Representative">Class Rep</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
            </SelectContent>
            </Select>
            <Select onValueChange={(value) => setCourse(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Courses" />
            </SelectTrigger>
            <SelectContent>
                {data1.map((d,i) => (
                    <SelectItem key={i} value={d.title}>{d.title}</SelectItem>
                ))}
            </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSem(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Semesters" />
            </SelectTrigger>
            <SelectContent>
                {data2.map((d,i) => (
                    <SelectItem key={i} value={d.title}>{d.title}</SelectItem>
                ))}
            </SelectContent>
            </Select>

            
            
        </CardContent>
        <CardFooter className='flex flex-col gap-2 items-start font-semibold'>
            <Button onClick={handleSubmit}>Sign up</Button>
            <Link href='/auth/login'>Log in</Link>
        </CardFooter>
    </Card>

  )
}

export default page