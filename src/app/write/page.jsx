"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const storage = getStorage(app);
const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

import 'froala-editor/js/froala_editor.pkgd.min.js';
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/post", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className="md:h-[100vh] h-full w-3/4 mx-auto">
      <input
        type="text"
        placeholder="Title"
        className="p-12 w-2/3 text-2xl border-none bg-transparent mt-10 outline-none"
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="bg-transparent my-10"
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className="flex h-[300px] gap-5 relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full bg-transparent border flex items-center justify-center border-black"
        >
          <Image src="/images/plus.jpg" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className="flex gap-6 bg-[#ded9d9] absolute z-[999] w-3/4 left-[50px]">
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <button className="w-8 h-8 rounded-full bg-transparent border flex items-center justify-center border-red-700">
              <label htmlFor="image">
                <Image
                  src="/images/imageIcon.png"
                  alt=""
                  width={16}
                  height={16}
                />
              </label>
            </button>
            <button className="w-8 h-8 rounded-full bg-transparent border flex items-center justify-center border-red-700">
              <Image src="/images/video.png" alt="" width={16} height={16} />
            </button>
            <button className="w-8 h-8 rounded-full bg-transparent border flex items-center justify-center border-red-700">
              <Image src="/images/external.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <div className="w-full text-xl">
          <FroalaEditor
            onModelChange={setValue}
            config={{
              placeholderText: "Write your blog"
            }}
          />
        <button
          className="md:mt-16 my-28 mx-12 px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-900 font-semibold"
          onClick={handleSubmit}
        >
          Publish
        </button>
        </div>
      </div>
    </div>
  );
}
