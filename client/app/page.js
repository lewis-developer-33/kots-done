"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const role = localStorage.getItem("role")
  console.log(role)
  if (!role) router.push('/auth/login')
  if (role == 'Student') router.push('/student')
  if (role == 'Lecturer') router.push('/lecturer')
  if (role == 'Admin') router.push('/admin')
  return (
    <div></div>
  )
}

export default page