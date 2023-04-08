"use client"
import Image from "next/image"
import Link from "next/link"
import boy from '../../../images/boy.jpg'
import {
  useQuery
} from "react-query";
import { Posts } from "@/app/types/Posts";
import { useState } from "react";

function Post() {
  const [page, setPage] =useState(0)
  const [skip, setSkip] = useState(0)

    const { isLoading, error, data, isFetching,isPreviousData } = useQuery<Posts[]>({
      queryFn: async () =>{
        const response = await fetch(`http://localhost:3000/api/posts/getPosts?page=${page}&skip=${skip}`)
        return response.json();
      },
      queryKey: ["posts",page],
      keepPreviousData: true,
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error

    if(isFetching) return "Fetching...";


  return (
    <>
        {
            data?.map(post =>(
            <Link href={`post/${post.id}`}>
                <div key={post.id} className="bg-white p-8 my-4 mx-4 rounded-lg hover:translate-x-3 transition-all duration-300 ">
                    <div className="flex items-center gap-2">
                        <Image
                            className="rounded-full"
                            width={32}
                            height={32}
                            src={post.user.image || boy}
                            alt="avatar"
                        />
                        <h3 className="font-bold text-gray-700">{post.user.name}</h3>
                    </div>
                    <div className="my-8">
                        <p className="break-all">{post.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-thin text-gray-700"> 
                            {post.Comment?.length} comments
                        </p>
                    </div>
                </div>
             </Link>
            ))
        }

   <div className="flex gap-5 my-7 items-center justify-center">
      <p className="text-white text-sm font-normal">Page: {page + 1} </p>
      <div className="flex gap-3">
        <button
          onClick={() =>{
            setPage((old) => Math.max(old - 1, 0)) 
            setSkip(skip-10)
          }}
          disabled={page === 0}
          className="bg-white px-3 py-3 rounded-md text-black text-sm hover:bg-slate-200 disabled:bg-slate-200"
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            setPage(page+1)
            setSkip(skip + 10)
          }}
          disabled={data?.length ===0}
          className="bg-white px-6 py-2 rounded-md text-black text-sm hover:bg-slate-200 disabled:bg-slate-200"
        >
          Next Page
      </button>
      </div>
   </div>
    </>
  )
}

export default Post