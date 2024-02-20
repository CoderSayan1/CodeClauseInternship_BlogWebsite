// for all comments of a post

import { getAuthSession } from "@/utils/authOptions";
import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

export const POST = async (request) => {
  try {
    const body = await request.json();
    const session = await getAuthSession()
    // const { desc, userEmail, postSlug } = body;

    if(!session){
      return NextResponse.json(
        { message: "Error", error: error.message || "Not Authenticated" },
        { status: 401 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email
      },
    });

    return NextResponse.json(newComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};



export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams ? searchParams.get("postSlug") : null; // Add null check here
  try {
      const comments = await prisma.comment.findMany({
        where: {
          postSlug: postSlug, // Filter comments based on post ID
        },
        include: { user: true, post: true },
      });

      return NextResponse.json(comments, { status: 200 });
    } 
   catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong", error:error }, { status: 500 });
}
}




