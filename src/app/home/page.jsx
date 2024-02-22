import React from "react";
// import CardSection from "../cards/page";
import Trending from "../trending/page";
import CardSection from "@/components/CardSection"

const Main = ( page ) => {
  return (
    <>
      <div className="w-3/4 mx-auto mt-20 grid place-items-center">
        <Trending />
      </div>
      <div className="w-3/4 mx-auto mt-20">
        <CardSection page={page} />
      </div>
    </>
  );
};

export default Main;
