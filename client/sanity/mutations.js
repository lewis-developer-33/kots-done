import { createClient,groq } from "next-sanity";
import { client } from "./lib/client";

// User sign up
export const registerUser = async () => {
    const user = {
        _type:"user",
        name:'',
        email:'',
        registration_number:"",
        staff_number:"",
        password:"",
        course:"",
        semester:"",
        role:"",
    }
    const foundUser = await client.fetch(groq`*[_type=="user" && email == "${user.email}"][0]`)
    console.log(foundUser)
    const result = client.create(user)
}

// User log in
// Class rep create,edit and delete post he owns
// Lecturer create,edit and delete post he owns
// Admin create,edit and delete post all
