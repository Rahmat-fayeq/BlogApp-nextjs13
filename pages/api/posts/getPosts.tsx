import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'GET'){
        try{
          let { skip,page }:any = req.query
          skip = parseInt(skip)
          
            const posts = await prisma.post.findMany({
              skip:skip,
              take:10,
                include:{
                  user:true,
                  Comment:true
                },
                orderBy:{
                  createdAt: 'desc',
                }
              });
            return res.status(200).json(posts)
        }catch(err:any){
            return res.status(500).json({error: err.message});
        }
    }
}