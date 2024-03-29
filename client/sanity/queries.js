import { createClient,groq } from "next-sanity";

// Fetch notices for specific course and semester
// *[_type=="notice" && references(*[_type=="course" && title == "BBC"]._id) && references(*[_type=="semester" && title == "4.1"]._id)] | order(_createdAt asc)
export const fetchNoticesCourse = ({course,sem}) => {
    return createClient().fetch(
        groq`*[_type=="notice" && references(*[_type=="course" && title == "${course}"]._id) && references(*[_type=="${sem}" && title == "4.1"]._id)]
        {
            title,
            "file":file.asset->url,
            "authorName":author->name,
            "authorImage":author->image.asset->url,
            body,
            "image":mainImage.asset->url,
            "slug":slug.current,
            publishedAt
        }
        | order(_createdAt asc)`
    )
}

// Fetch notices for specific school
// *[_type=="notice" && references(*[_type=="school" && title == "SCIT"]._id)] | order(_createdAt asc)
export const fetchNoticesSchool = (school) => {
    return createClient().fetch(
        groq`*[_type=="notice" && references(*[_type=="school" && title == "${school}"]._id)]
        {
            title,
            "file":file.asset->url,
            "authorName":author->name,
            "authorImage":author->image.asset->url,
            body,
            "image":mainImage.asset->url,
            "slug":slug.current,
            publishedAt
        }
        | order(_createdAt asc)`
    )
}

// Fetch notices for specific college
// *[_type=="notice" && references(*[_type=="college" && title == "COPAS"]._id)] | order(_createdAt asc)
export const fetchNoticesCollege = (college) => {
    return createClient().fetch(
        groq`*[_type=="notice" && references(*[_type=="college" && title == "${college}"]._id)]
        {
            title,
            "file":file.asset->url,
            "authorName":author->name,
            "authorImage":author->image.asset->url,
            body,
            "image":mainImage.asset->url,
            "slug":slug.current,
            publishedAt
        }
        | order(_createdAt asc)`
    )
}

// Fetch all notices
// *[_type == "notice"] | order(_createdAt asc){
//   title,
//   "file":file.asset->url,
//   "authorName":author->name,
//   "authorImage":author->image.asset->url,
//   body,
//   "image":mainImage.asset->url,
//   "slug":slug.current,
//   publishedAt
// }
export const fetchNotices = () => {
    return createClient().fetch(
        groq`*[_type == "notice"]
        {
            title,
            "file":file.asset->url,
            "authorName":author->name,
            "authorImage":author->image.asset->url,
            body,
            "image":mainImage.asset->url,
            "slug":slug.current,
            publishedAt
        }
        | order(_createdAt asc)`
    )
}

export const fetchComments = () => {
    return createClient().fetch(
        groq`*[_type == "comment"]
        {
            "authorName":author->name,
            "authorImage":author->image.asset->url,
            body,
            publishedAt
        }
        | order(_createdAt asc)`
    )
}
