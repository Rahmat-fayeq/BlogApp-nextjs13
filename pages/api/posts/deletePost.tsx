import type {NextApiRequest, NextApiResponse} from 'next'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){

    const session = await getServerSession(req,res,authOptions)

    if(!session) return res.status(401).json({message:"You are not authenticated"})
    if(req.method === 'DELETE'){
        const postId:string = JSON.parse(req.body)
        try{
            const result = await prisma.post.delete({
                where: {
                  id: postId
                },
              })
              return res.status(200).json({message:`Post with id ${result.id} has been deleted`})

        }catch(err:any){
            return res.status(500).json({error:err.message})
        }

    }
}