export const department = {
    name: 'department',
    title: 'Department',
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
        name: 'schools',
        title: 'Schools',
        type: 'reference',
        to:{type:'school'}
      },
    ],
  }
  