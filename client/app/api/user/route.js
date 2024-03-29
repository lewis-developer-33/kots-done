import { groq } from "next-sanity";
import {client} from '@/sanity/lib/client'

export async function GET() {
    const user= {email:"gitonga.muriungi1@students.jkuat.ac.ke"}
    const res = await await client.fetch(groq`*[_type=="user" && email == '${user.email}']`)
    return Response.json({ res })
}

export async function POST(request) {
    const res = await request.json()
    // return Response.json({ res })

    const name = res.name
    const email = res.email
    const password = res.password
    const role = res.role
    const userFound = await  client.fetch(groq`*[_type=="user" && email == '${email}'][0]`)
    const roleFound = await client.fetch(groq`*[_type=="role" && title == '${role}'][0]`)

    if (role != null)
    {
        await client.create({
            _type:"user",
            name,
            email,
            password,
            role:roleFound._id
        })
        return Response.json({message :"User created"})
    }

    if (userFound) { 
        if (userFound.password == password) return Response.json({message :userFound})
        return Response.json({error :"Wrong details"})
    }
    
}