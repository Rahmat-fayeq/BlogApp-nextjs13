'use client'
import { IPosts } from "@/app/types/MyPost"
import EditPost from "./EditPost"
import {useQuery} from "react-query"

const MyPosts = () => {

  const {isLoading,error,data} = useQuery<IPosts[]>({
    queryFn: async ()=> {
      const response = await fetch('http://localhost:3000/api/posts/myPosts') 
      const result = await response.json()
      return result.Post
    },
    queryKey: ["myPosts"]
  })

  if(isLoading) return <h4 className="mt-7 text-white font-semibold">Loading...</h4>
  if(error) return "Error has occurred..."

  return (
    <>
      {
        data?.map(post =>(
            <EditPost key={post.id} id={post.id} name={post.user.name} title={post.title} avatar={post.user.image || ''} comments={post.Comment} />
        ))
      }
    </>
  )
}

export default MyPosts