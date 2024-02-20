import CardSection from "./cards/page";

import Trending from "./trending/page";

// @ts-ignore
export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <>
      <div className="min-h-[100vh]">
        <div className="w-3/4 mx-auto mt-20 grid place-items-center">
          <Trending />
        </div>
        <div className="w-3/4 mx-auto mt-20">
          <CardSection page={page} cat={undefined} />
        </div>
      </div>
    </>
  );
}
