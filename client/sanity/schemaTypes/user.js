export const user = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'registration_number',
      title: 'Registration_number',
      type: 'string',
    },
    {
      name: 'staff_number',
      title: 'Staff_number',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
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
      name: 'course',
      title: 'Course',
      type: 'reference',
      to:{
        type:'course'
      }
    },
    {
      name: 'semester',
      title: 'Semester',
      type: 'reference',
      to:{
        type:'semester'
      }
    },
    {
      name: 'role',
      title: 'Role',
      type: 'reference',
      to:{
        type:'role'
      }
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
