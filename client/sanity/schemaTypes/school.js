export const school = {
    name: 'school',
    title: 'School',
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
        name: 'colleges',
        title: 'Colleges',
        type: 'reference',
        to:{type:'college'}
        
      },
    ],
  }
  