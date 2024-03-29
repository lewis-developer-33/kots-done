export const notice = {
  name: 'notice',
  title: 'Notice',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'user'},
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
    },
    {
      name: 'college_tag',
      title: 'College_Tag',
      type: 'reference',
      to:{type:'college'}
    },
    {
      name: 'school_tag',
      title: 'School_Tag',
      type: 'reference',
      to:{type:'school'}
    },
    {
      name: 'course_tag',
      title: 'Course_Tag',
      type: 'reference',
      to:{type:'course'}
    },
    {
      name: 'semester_tag',
      title: 'Semester_tag',
      type: 'reference',
      to:{type:'semester'}
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
}
