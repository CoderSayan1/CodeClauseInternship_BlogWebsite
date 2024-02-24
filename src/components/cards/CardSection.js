import Pagination from "@/components/pagination/pagination";
import Link from "next/link";
import cheerio from "cheerio";
import Image from "next/image";

const getDataCate = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/category", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const getDataCards = async (page, cat) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/post?page=${page}&cat=${cat}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const stripHtmlTags = (html) => {
  const $ = cheerio.load(html);
  return $.text();
};

export default async function CardSection({ page, cat }) {
  const dataCate = await getDataCate();
  const { posts, count } = await getDataCards(page, cat);
  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  return (
    <>
      {/* Cards */}
      <div className="flex justify-between h-full w-full border-black border-t-2 pt-4">
        <div className="w-2/3 flex flex-col border-r-2 border-black">
          <h1 className="uppercase font-bold md:text-2xl text-xl md:mb-10 mb-6 text-center">
            Recent posts
          </h1>
          <div className="flex flex-col items-center justify-center">
            {posts?.map((item) => {
              return (
                <div className="w-2/3 flex flex-col" key={item._id}>
                  <div className="flex justify-around items-center mb-2">
                    <span className="text-red-700 font-semibold text-lg  capitalize">{item.catSlug}</span>
                    <span className="md:font-semibold font-medium md:text-lg text-[10px]">{item.createdAt.substring(0, 10)}</span>
                  </div>
                  {<Image
                    src={item.img || "/images/blog1.jpg"}
                    alt=""
                    width={500}
                    height={700}
                    className="w-auto h-auto rounded-xl shadow-2xl"
                  />}
                  <Link href={`/posts/${item.slug}`}>
                    <h1 className="text-xl mt-2 capitalize">{item.title}</h1>
                  </Link>
                  <p className="my-4">{stripHtmlTags(item.desc)}</p>
                  <Link href={`/posts/${item.slug}`}>
                    <button className="capitalize text-start mb-10 bg-red-700 text-white font-medium text-sm w-[max-content] px-2 py-1 rounded">Read more</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category section */}
        <div className="w-1/3 flex flex-col md:pl-10 pl-6">
          <div className="">
            <h1 className="uppercase font-bold md:text-2xl text-lg md:mb-6 mb-4 md:text-center text-start">
              Some Cate..
            </h1>
            <div className="flex flex-wrap items-center justify-center">
              {dataCate?.map((item) => {
                return (
                  <div key={item._id} className="my-4">
                    <Link
                      href={`/blog?cat=${item.slug}`}
                      className={`bg-teal-600 hover:bg-teal-700 md:text-xl text-lg text-white md:font-semibold font-medium md:px-4 px-2 md:py-2 py-1 md:mx-4 mx-2 my-2 rounded-xl capitalize`}
                    >
                      {item.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Another section */}
          <div className="my-14">
            <div className="text-center text-wrap">
              <h1 className="uppercase font-bold md:text-2xl text-lg md:mb-10 mb-2">
                featured blog
              </h1>
              <div className="flex flex-col justify-center items-center">
                <img
                  src="./images/logo1.png"
                  alt="reload"
                  className="md:h-60 rounded-2xl shadow-2xl hidden md:block"
                />
                <p className="mt-8 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur error corrupti, rerum similique labore illo ea
                  excepturi vitae. Molestiae tempore sit veniam dolor sint
                  dolorem hic cum quis, ipsa incidunt?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="3/4 mx-auto">
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    </>
  );
}
