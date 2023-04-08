import type {NextApiRequest, NextApiResponse} from 'next'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'GET'){

        const session = await getServerSession(req,res,authOptions)
       if(!session){
            return res.status(403).json({"message":"You are not authenticated"});
       }

       try{

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string,
            }
        })

        const commments = await prisma.comment.findMany({
            where: {
                userId: user?.id,
            },
            include:{
                post: true
            }
        })

        return res.status(200).json(commments)
       }catch(err:any){
        return res.status(403).json({"error":err.message});
       }

    }
}