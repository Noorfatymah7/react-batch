"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  async function Getblogs() {
    try {
      const { data } = await axios.get("/api/blogs?filter=isFeatured");
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
        <BlogCard data={v} />
      ))}
    </div>
  );
};

export default FeaturedBlogs;
