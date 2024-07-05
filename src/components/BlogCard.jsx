"use client";

import { Clock12Icon, Edit, Trash, UserCircle2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const BlogCard = ({ data, del }) => {
  const formattedCreatedAt = moment(data?.createdAt).format("MMM Do YY");
  const img =
    data?.Images ||
    "https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      key={data._id}
      className="relative group rounded-md shadow-md overflow-hidden shadow-slate-400"
    >
      <div>
        <img className="w-full h-full object-cover aspect-video" src={img} alt="" />
        <div className="py-4 px-4">
          <span className="bg-purple-600/45 py-2 px-4 rounded-md text-xs">{data?.Catagorise}</span>
          <div className="py-4 space-y-2">
          <h2 className="text-xl font-semibold line-clamp-2">{data?.Title}</h2>
          <p className="text-gray-500 line-clamp-2">
            {data?.Description}
          </p>
          </div>
          <div className=" flex justify-between items-center">
            <span className="flex items-center gap-2">
              <UserCircle2Icon />
              {data?.Author}
            </span>
            <time className="flex items-center gap-2" datetime="">
              <Clock12Icon />
              {formattedCreatedAt}
            </time>
          </div>
        </div>
        <div className="flex gap-4  absolute -top-10 right-0 px-2 py-1 text-white opacity-0 group-hover:opacity-100 group-hover:top-0 duration-150">
          <button
            onClick={() => {
              del(data._id);
            }}
            className="bg-red-500 px-3 py-2 rounded-md"
          >
            <Trash size={14}/>
          </button>
          <Link
          href={`/upload?id=${data?._id}`}
            className="bg-green-500 px-3 py-2 rounded-md"
          >
            <Edit size={14}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
