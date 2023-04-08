import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../../prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'GET'){
        try{
            const post = await prisma.post.findUnique({ 
                where: {id: req.query.slug as string},
                include: {
                    user:true,
                    Comment:{
                        orderBy:{
                            createdAt:'desc',
                        },
                        include:{
                            user:true,
                        }
                    }
                }
            });
            return res.status(200).json(post)
        }catch(err:any){
            return res.status(500).json({error: err.message});
        }
    }
}