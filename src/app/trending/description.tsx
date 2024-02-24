

import { images } from "@/utils/imageArr";
import { motion } from "framer-motion";

type Props = {
  clickPrev: any;
  clickNext: any;
  activeImgIndex: any;
};

const Description = ({ clickNext, clickPrev, activeImgIndex }: Props) => {
  return (
    <div className="grid place-items-start w-full bg-[#e7dfd9] relative md:rounded-tr-3xl md:rounded-br-3xl rounded-br-3xl">
      <div className="uppercase md:text-xl text-sm right-2.5 absolute border border-black md:p-2 p-1 md:rounded-lg rounded-md bg-slate-200 md:font-semibold font-medium shadow-2xl md:mt-[-20px] md:mr-[-40px] mt-[-20px] mr-[-20px]">
        Latest posts
      </div>
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImgIndex ? "block w-full h-[30vh] md:h-[50vh] md:p-10 p-4 text-left" : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImgIndex ? 0 : 0.5,
              scale: idx === activeImgIndex ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImgIndex ? 1 : 0.5,
              scale: idx === activeImgIndex ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 3,
              x: { duration: 4 },
            }}
            className="w-full"
          >
            <div className="py-2 md:py-4 md:text-5xl text-lg font-bold">{elem.title}</div>
            <div className="leading-relaxed font-medium text-base tracking-wide h-30 md:h-20 italic text-gray-600">
              {elem.description}
            </div>
          </motion.div>

          <button className="hover:bg-[#ecae7e] bg-[#bc7c4c] text-white md:px-4 md:py-2 px-2 py-2 rounded-md md:my-10 my-8">
            Read More
          </button>
          <div className="md:absolute hidden md:bottom-1 bottom-10 right-10 md:right-0 w-full md:flex justify-center items-center">
            <div onClick={clickPrev} className="absolute bottom-2 right-10 cursor-pointer border border-black rounded-full px-2 py-1">&#5130;</div>
            <div onClick={clickNext} className="absolute bottom-2 right-2 cursor-pointer border border-black rounded-full px-2 py-1">&#5125;</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;