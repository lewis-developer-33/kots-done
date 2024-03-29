export const course = {
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'departments',
        title: 'Departments',
        type: 'reference',
        to:{type:'department'}
      }
    ],
  }
  