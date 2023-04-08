'use client'

import Image from "next/image"

interface ICommentProps{
  id:string 
  message:string
  date:string
  name:string
  avatar:string
}

export default function ShowComment({id,message,date,name,avatar}:ICommentProps) {
  return (
      <div className="my-10 border-b last:border-none">
          <div className="flex items-center gap-2">
              <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={avatar}
                  alt="avatar"
              />
              <h3 className="font-bold text-gray-700">{name}</h3>
              <h2 className="text-sm">{date}</h2>
          </div>
          <div className="my-8">
              <p className="break-all">{message}</p>
          </div>
      </div>   
  )
}
