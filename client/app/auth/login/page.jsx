'use client'
import React,{useState} from 'react'
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
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
  

const page = () => {
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    
    const {toast} = useToast()
    const router = useRouter()
    
    const handleSubmit = async () => {
        const user = {email,pass}
        console.log(user)
        const res = await axios.post('http://localhost:8000/login',user)
        console.log(res.data.message)
        if (res.data.message){
            toast({
                title:"Success logged in"
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


        </CardContent>
        <CardFooter className='flex flex-col gap-2 items-start font-semibold'>
            <Button onClick={handleSubmit}>Log in</Button>
            <Link href='/auth/sign-up'>Sign up</Link>
        </CardFooter>
    </Card>

  )
}

export default page