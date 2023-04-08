export type Posts = {
    id: string
    title: string
    avatar: string,
    createdAt?: string
    user: {
        name: string
        image: string
      }
    Comment?: {
        id: string
        createdAt: string
        postId: string
        userId: string
    }[]
  }
  