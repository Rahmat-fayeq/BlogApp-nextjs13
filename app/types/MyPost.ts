export interface IPosts{
      id: string
      title: string
      createdAt: string
      user:{
        id: string
        name: string
        image: string
      }
      Comment?: {
        id: string
        postId: string
        title: string
        userId: string
        createdAt: string
      }[]
  }[]
  