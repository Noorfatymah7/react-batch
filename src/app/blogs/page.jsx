"use client";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  async function Blogdel(id) {
    try {
      const { data } = await axios.delete(`/api/blogs/${id}`);
      if (data?.success) {
        Getblogs();
        toast.success("deleted");
        return;
      }
      toast.error("Somthing went wrong!");
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!");
    }
  }
  async function Getblogs() {
    try {
      const { data } = await axios.get("/api/blogs");
      if (data.success) {
        setBlogs(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    Getblogs();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {blogs?.map((v, i) => (
        <BlogCard del={Blogdel} data={v} />
      ))}
    </div>
  );
};

export default Page;
