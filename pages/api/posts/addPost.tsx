import type {NextApiRequest, NextApiResponse} from 'next'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'POST'){

        const session = await getServerSession(req,res,authOptions)

        if(!session) return res.status(401).json({message:"You are not authenticated"})

        const title:string = req.body.title 

        if(title.length>300) return res.status(403).json({message:"Text is too long"})
        if(!title.length) return res.status(403).json({message:"Text cannot be empty"})

        try{

            const user = await prisma.user.findUnique({
                where:{
                    email: session?.user?.email as string
                }
            })
    
            const post = await prisma.post.create({
                data:{
                    title:title,
                    userId: user?.id
                } as any
            })

            return res.status(200).json(post)

        }catch(err:any){
            return res.status(500).json({error:err.message})
        }

    }
}