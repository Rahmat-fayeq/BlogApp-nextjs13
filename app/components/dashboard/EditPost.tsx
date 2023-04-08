'use client'

import Image from "next/image";
import Toggle from "./Toggle";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query"
import boy from '../../../images/boy.jpg'
import Link from "next/link";

interface IEditProps{
    id: string;
    name: string;
    avatar:string;
    title:string;
    comments?:{
        id: string;
        postId:string;
        userId: string;
    }[]
}

function EditPost({id,name,title,comments,avatar}:IEditProps) {
  const [toggle, setToggle] = useState(false)

  const queryClient = useQueryClient()
  const {mutate} = useMutation(
    async (id:string)=>(
      await fetch('http://localhost:3000/api/posts/deletePost',{
            method: 'DELETE',
            body: JSON.stringify(id)
          })
     ),
     {
        onError:(error)=>{
          console.log(error)
        },
        onSuccess: async (data)=>{
          const res = await data.json()
          if(data.ok) toast.success(res.message)
          if(!data.ok) toast.error(res.error)
          queryClient.invalidateQueries(["myPosts"])
        }
     }
          
    
  )


  const handleDelete = () =>{
    mutate(id)
  }

  return (
    <>
      <div className="bg-white p-8 my-4 mx-4 rounded-lg hover:translate-x-3 transition-all duration-300">
        <div className="flex gap-2 items-center">
            <Image width={32} height={32} src={avatar || boy} alt={''} className="rounded-full" />
            <h3 className="font-semibold text-gray-500">{name}</h3>
        </div>
        <div className="my-8">
          <h3 className="font-medium text-gray-700 break-all">{title}</h3>
        </div>
        <div className="flex items-center justify-between">
            <p className="font-normal text-gray-600 text-sm">
             <Link href={`post/${id}`}>
                {comments?.length} comments
              </Link>  
            </p>
            <button onClick={(e)=>setToggle(true)} className="text-sm font-semibold text-red-500 hover:text-red-600 hover:font-bold">Delete</button>
        </div>
      </div>
      {toggle && <Toggle deletePost={handleDelete} setToggle={setToggle} />}
    </>
  )
}

export default EditPost