import { groq } from "next-sanity";
import {client} from '@/sanity/lib/client'


export async function POST(request) {
    const formData = await request.formData()

    const email = formData.get("email")
    const title = formData.get("title")
    const file = formData.get("file")
    const body = formData.get("body")
    const image = formData.get("image")

    const courseSelected = formData.get("course")
    const semSelected = formData.get("sem")
    

    const userFound = await client.fetch(groq`*[_type=="user" && email == '${email}']`)
    if (userFound)  {
      // Class rep
      if (courseSelected == null){

        const course = userFound.course
        const sem = userFound.semester
  
        const result = await client.create({
          _type:"notice",
          title,
          file,
          body,
          image,
          course_tag:course,
          semester_tag:sem
        })
        return Response.json({result})
      }
      else {
        // Lecturer
        const courseFound = await client.fetch(groq`*[_type=="course" && title == '${courseSelected}']`)
        const semFound = await client.fetch(groq`*[_type=="semester" && title == '${semSelected}']`)
        const result =await client.create({
          _type:"notice",
          title,
          file,
          body,
          image,
          course_tag:courseFound,
          semester_tag:semFound
        })
        return Response.json({result})

      }
    }
    else {
        return Response.json({error:"Not authorized"})
    }
}