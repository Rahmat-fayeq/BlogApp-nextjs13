'use client'
import {useRef, useState} from 'react'
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query'

function AddPost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const inputRef:any = useRef(null)

  const queryClient = useQueryClient()
    //Create a post
  const { mutate } = useMutation(
    async (title: string) =>
      await fetch('api/posts/addPost',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title}),
    }),
    {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: async (data) => {
        const res = await data.json();
        if(data.ok){
          setTitle("")
          setIsDisabled(false)
          queryClient.invalidateQueries(["posts"])
           toast.success("Post has been made 🔥")
          }

        if(!data.ok){
           setIsDisabled(false)
           toast.error(res.message)
          }
      },
    }
  )

    const handleFormSubmit = (e:React.FormEvent)=> {
        e.preventDefault();
        setIsDisabled(true)
        mutate(title)
    }

  return (
    <form  onSubmit={handleFormSubmit} className='bg-white p-8 my-8 mx-4 rounded-md' onClick={()=>inputRef.current.focus()}>
        <div className='flex flex-col my-4'>
            <textarea
                name='title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="what's on your mind?"
                className='p-4 my-2 text-lg bg-gray-200 rounded-md'
                ref={inputRef}
            ></textarea>
        </div>
        <div className='flex justify-between items-center'>
            <p className={`text-sm font-light ${title.length>=300?'text-red-600':'text-gray-600'}`}>
                {`${title.length}/300`}
            </p>
            <button 
                type='submit' 
                disabled={isDisabled}
                className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-1 rounded-md'>
                Create
            </button>
        </div>
    </form>
  )
}

export default AddPost