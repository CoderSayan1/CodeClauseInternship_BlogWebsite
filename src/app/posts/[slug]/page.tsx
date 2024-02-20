import Comments from "@/components/comments/comments";
import Image from "next/image";

// @ts-ignore
const getDataCards = async (slug) => {
  const res = await fetch(
    `http://localhost:3000/api/post/${slug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};


// @ts-ignore
export default async function SinglePage({params}) {
  const {slug} = params;
  const data = await getDataCards(slug);
  // console.log(data);
  return (
    <div className="h-[100vh] md:h-full">
      <div className="w-3/4 mx-auto my-10 flex gap-20">
        <div className="md:w-2/3 w-full">
          <h1 className="font-bold text-2xl ">
            {data?.title}
          </h1>
          <div className="mt-10 flex gap-4">
          {data?.user && data?.user?.image && <Image
              src={data.user.image}
              alt=""
              height={50}
              width={50}
              className="rounded-full"
            />}
            <div className="flex flex-col">
              <span className="text-xl">{data.user.name}</span>
              <span>{data.createdAt.substring(0, 10)}</span>
            </div>
          </div>
            <p className="mt-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iste temporibus sed recusandae ea in fugit voluptates nisi quos voluptatem.</p>
        </div>
        {data?.img && <div className="md:block hidden">
          <Image
            src={data.img}
            alt=""
            height={450}
            width={400}
            className="rounded-xl"
          />
        </div>}
      </div>
      <div className="w-3/4 mx-auto mb-10" dangerouslySetInnerHTML={{ __html: data?.desc || "" }} />


      <div className="w-3/4 mx-auto">
        <Comments postSlug={slug}/>
      </div>
    </div>
  );
}
