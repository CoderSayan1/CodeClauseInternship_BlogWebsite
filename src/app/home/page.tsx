import React from "react";
import CardSection from "../cards/page";
import Trending from "../trending/page";
import { NextPage } from "next";

interface MainProps {
  page: Number;
}

const Main: NextPage<MainProps> = ({ page }) => {

  return (
    <>
      <div className="w-3/4 mx-auto mt-20 grid place-items-center">
        <Trending />
      </div>
      <div className="w-3/4 mx-auto mt-20">
        <CardSection page={page} cat={undefined} />
      </div>
    </>
  );
};

export default Main;
