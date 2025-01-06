import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {  PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export async function GET(request){
    const session=await getServerSession(authOptions);
    if(!session){
        return new Response('Unauthorized',{
            status:401
        })
    }

    try{
        const list=await prisma.list.findUnique({
            where:{createdtorId:session.user.id,
                id: request.params.id
            }
        })

        return new Response(JSON.stringify(list),{
            status:200,
            message:"List retrieved successfully"
        })
    }catch(e){
        console.log(e)
        return new Response('Internal Server Error',{
            status:500
        })
    }


}