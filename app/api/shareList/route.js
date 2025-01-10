const { PrismaClient } = require("@prisma/client");

const prisma=new PrismaClient();

export async function GET(request,{params}){
    const {token}=params;

    try{
        const list=await prisma.list.findUnique({
            where:{
                shareToken:token
            },
            include:{
                items:true
                
            }
        })
        if(!list){
            return Response.json({
                error:"List Not found",
                status:404
            })
        }
        return Response.json(
            { data: list, message: "List retrieved successfully" },
            { status: 200 }
        );
    }catch (error) {
        console.error('Error retrieving list:', error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}