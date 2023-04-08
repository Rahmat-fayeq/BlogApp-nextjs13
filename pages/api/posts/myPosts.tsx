import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma/client'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'GET'){
        try{

            const session = await getServerSession(req,res,authOptions)
            if(!session){
                return res.status(403).json({message:"You are not authenticated"})
            }

            const posts = await prisma.user.findUnique({
                where:{
                    email: session.user?.email as string,
                },
                include: {
                    Post: {
                        include:{
                            Comment: true,
                            user:true,
                        },
                        orderBy:{
                            createdAt: 'desc'
                        }
                    }
                }
            }) 

            return res.status(200).json(posts)

        }catch(err:any){
            return res.status(500).json({error: err.message});
        }
    }
}