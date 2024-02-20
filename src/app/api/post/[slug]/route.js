// for single post

import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { slug, title, desc, img, views, userEmail, catSlug, userIds } = body;
    const newPost = await prisma.post.create({
      data: {
        slug: slug,
        title: title,
        desc: desc,
        img: img,
        views: parseInt(views),
        userEmail: userEmail,
        catSlug: catSlug,
        cat: { connect: { slug: catSlug } }, // Connecting Category
        user: { connect: { email: userEmail } }, // Connecting Post to User
        comments: {
          connect: body.commentIds.map((commentId) => ({ id: commentId })),
        },
      },
    });
    return NextResponse.json(newPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 }
    );
  }
};


export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: {views: {increment: 1}},
      include: {user: true},
    });
    const userData = await prisma.user.findMany();
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};


