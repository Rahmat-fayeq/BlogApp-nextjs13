'use client'

import AddComment from "@/app/components/comment/AddComment"
import ShowComment from "@/app/components/comment/ShowComment"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useQuery } from "react-query"

type Post = {
  id: string
  title: string
  avatar: string,
  createdAt?: string
  user: {
      id: string
      name: string
      email: string
      image: string
    }
  Comment?: {
      id: string
      message: string
      createdAt: string
      postId: string
      userId: string
      user:{
        id: string
        name: string
        email: string
        image: string
      }
  }[]
}


type URL={
  params: {
    slug: string
  }
}

export default function PostDetails(url:URL) {

  const session = useSession();

  if(session.status === 'unauthenticated'){
    return  redirect('/api/auth/signin')
  }

  const slug = url.params.slug;

  const {data,isLoading,isError,} = useQuery<Post>(
    {
      queryFn: async ()=>{
        const response = await fetch(`http://localhost:3000/api/posts/${slug}`)
        const result = await response.json()
        return result 
      },
      queryKey:["post", slug]
    }
  )
  if(isLoading) return <h3 className="text-white">Loading...</h3>
  if(isError) return "Error..."

  return (
    <>
      {
            <div className="bg-white p-8 my-4 mx-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <Image
                        className="rounded-full"
                        width={32}
                        height={32}
                        src={data?.user.image ||""}
                        alt="avatar"
                    />
                    <h3 className="font-bold text-gray-700">{data?.user.name}</h3>
                </div>
                <div className="my-8">
                    <p className="break-all">{data?.title}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href={`post/${data?.id}`}>
                        <p className="text-sm font-thin text-gray-700"> 
                            {data?.Comment?.length} comments
                        </p>
                    </Link>
                </div>
            </div>
        }
        <AddComment id={data?.id} />

        {/* comments of related post */}
        {/* @ts-expect-error */} 
       {data?.Comment?.length> 0 && (
          <div className="bg-white p-8 my-4 mx-4 rounded-lg">
          {
            data?.Comment?.map((comment)=>(
              <ShowComment 
                key={comment.id} 
                id={comment.id} 
                message={comment.message} 
                date={comment.createdAt}
                name={comment.user.name}
                avatar={comment.user.image || ""}
              />
            ))
          }
          </div>
        )
       }
    </>
  )
}
