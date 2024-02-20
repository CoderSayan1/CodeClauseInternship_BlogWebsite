import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/authOptions";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const session = await getAuthSession();
    if(!session){
      return NextResponse.json(
        { message: "Error", error: error.message || "Not Authenticated" },
        { status: 401 }
      );
    }
    // const { slug, title, desc, img, views, userEmail, catSlug, commentIds } = body;
    const createPost = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user.email
      },
    })
    return NextResponse.json(createPost, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Error", error:error}, {status: 500})
  }
};

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    let page = searchParams.get("page");
    const category = searchParams.get("category");
    const POST_PER_PAGE = 2;
    // page = parseInt(page);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(category && {catSlug: category}),
      },
    }
    try {
        const [posts, count] = await prisma.$transaction([
          prisma.post.findMany(query),
          prisma.post.count({where:query.where}),
        ]);
        return NextResponse.json({posts, count}, {status: 200}) 
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error"}, {status: 500})
    }
}
