import { groq } from "next-sanity";
import {client} from '@/sanity/lib/client'


export async function POST(request) {
    const formData = await request.formData()

    const email = formData.get("email")
    const title = formData.get("title")
    const body = formData.get("body")

    const userFound = await client.fetch(groq`*[_type=="user" && email == '${email}']`)
    const noticeFound = await client.fetch(groq`*[_type=="notice" && title == '${title}']`)

    const result = await client.create({
        _type:"comment",
        body,
        author:userFound,
        notice:noticeFound
      })
      return Response.json({result})
}