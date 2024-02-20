"use client";

import Image from "next/image";
import Description from "./description";
import { useEffect, useState } from "react";
import { images } from "@/utils/imageArr";

export default function Trending() {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    setActiveImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const clickPrev = () => {
    setActiveImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);

  return (
    <div className="grid place-items-center md:grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl">
      <div className="w-full flex flex-col items-center md:flex-row justify-center transition-transform ease-in-out duration-500 rounded-2xl">
        {images.map((pic, index) => (
          <div
            key={index}
            className={`${index === activeImage ? "block w-full h-[30vh] md:h-[50vh] object-cover transition-all duration-500 ease-in-out" : "hidden"}`}
          >
            <Image
              src={pic.src}
              alt="sorry for your network"
              width={400}
              height={400}
              className="w-full h-full object-cover md:rounded-tl-3xl md:rounded-bl-3xl"
            />
          </div>
        ))}
        <Description clickPrev={clickPrev} clickNext={clickNext} activeImgIndex={activeImage} />
      </div>
    </div>
  );
}