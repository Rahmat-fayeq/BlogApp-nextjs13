'use client'

import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"

type Props ={
    id?:string
}

type Comment = {
    postId?:string,
    comment:string
}

export default function AddComment({id}:Props) {
    const [comment, setComment] = useState("")
    const formRef:any = useRef(null)

    const clientQuery = useQueryClient();
    const {mutate, isLoading} = useMutation({
        mutationFn: async (data:Comment)=> fetch('http://localhost:3000/api/comments/addComment',{
            method: 'POST',
            body: JSON.stringify(data)
        }),
        onError: (err:any)=> {
            console.log(err)
        },
        onSuccess: async (response)=>{
            const res = await response.json()
            if(response.ok){
                setComment("")
                 clientQuery.invalidateQueries(["post", id])
                 return toast.success("Comment added successfully")
                }
            if(!response.ok){
                return toast.error(res.message)
            } 
            
        }
    })

    const handleFormSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        mutate({postId:id,comment})
    }


  return (
    <>
    <form action="" className="my-4 mx-4" onMouseOver={()=>formRef.current.focus()} onSubmit={handleFormSubmit}>
        <h3 className="text-white">Add comment</h3>
        <div className="flex">
            <input 
                type="text" 
                className="p-4 bg-white rounded-l-md my-2 w-full" 
                value={comment} 
                onChange={(e)=>setComment(e.target.value)}
                ref={formRef}
             />
             <button disabled={isLoading} type="submit" className="bg-black text-white p-4 my-2 rounded-r-md">Submit</button>          
        </div>
        <p className={`text-sm font-light ${comment.length>=100?'text-red-400 font-bold text-xl':'text-white'}`}>
            {`${comment.length}/100`}
        </p>
      
    </form>
    </>
  )
}
