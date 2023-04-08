
export interface IPost{
    id: string
    title: string
    createdAt: string 
    user:{
        id: string
        name: string 
        avatar: string
    }
    Comment?:{
        id: string 
        message: string 
        createdAt: string 
        postId: string
        userId:string
    }[]
}