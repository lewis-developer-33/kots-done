export const comment = {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
    {
        name: 'body',
        title: 'Body',
        type: 'blockContent',
        },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: {type: 'user'},
      },
      {
        name: 'notice',
        title: 'Notice',
        type: 'reference',
        to: {type: 'notice'},
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
  