import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (request) => {
    try {
      const body = await request.json();
      const { slug, title, color, img, postIds } = body;
      const createCategory = await prisma.category.create({
          data:{
              slug: slug,
              title: title,
              color: color,
              img: img,
              posts: { connect: postIds.map(postId => ({ id: postId })) }
          }
        })
      return NextResponse.json(createCategory, {status: 200})
    } catch (error) {
      console.log(error);
      return NextResponse.json({message: "Error", error:error}, {status: 500})
    }
};


export async function GET() {
    try {
        const categoriesWithPosts = await prisma.category.findMany({
            include: { posts: true } // Include posts for each category
        });

        return new NextResponse(JSON.stringify(categoriesWithPosts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}

