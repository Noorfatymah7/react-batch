"use client";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const inputs = [
  { placeholder: "Title", name: "Title", type: "text" },
  { placeholder: "Author", name: "Author", type: "text" },
  {
    placeholder: "Catagory",
    name: "Catagorise",
    type: "select",
    options: ["News", "Sports", "Technologise"],
  },
  {
    placeholder: "Featured",
    name: "isFeatured",
    type: "select",
    options: [
      { text: "false", value: false },
      { text: "true", value: true },
    ],
  },
  { placeholder: "Discription", name: "Description", type: "textarea" },
];

const page = ({ searchParams }) => {
  console.log(searchParams);
  const [img, setImg] = useState("");
  const [form, setForm] = useState({
    Title: "",
    Description: "",
  });
  const [loading, setLoading] = useState(false);

  function handler(e) {
    const { name, value } = e.target;
    if (name == "isFeatured") {
      setForm({ ...form, [name]: true });
      return;
    }
    setForm({ ...form, [name]: value });
  }

  async function submit(e) {
    e.preventDefault();
    let formdata = { ...form, Images: img };
    console.log(formdata);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/blogs", formdata);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Your Blog Have Been Submittted!");
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function Getone() {
    try {
      const { data } = await axios.get(`/api/blogs/${searchParams.id}`);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Your Blog Have Been Submittted!");
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    Getone();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <Toaster position="bottom-right" reverseOrder={false} />
      <form
        onSubmit={submit}
        className="rounded-lg space-y-4 py-4 px-6 max-w-[600px] shadow-md"
      >
        {/* Header of the form ===================================== */}
        <div>
          <div className="flex justify-start items-center gap-2">
            <div className="h-2 w-2 bg-blue-900 rounded-full animate-pulse " />
            <h1 className="text-xl font-semibold mb-1 first-letter:text-blue-800">
              Blog Descreption
            </h1>
          </div>
          <p className="text-gray-600 text-xs">
            Please fill the form Completely
          </p>
        </div>
        {/* Inputs of the from ================================ */}
        <div className="grid grid-cols-2 gap-3 [&>*:nth-child(1)]:col-span-2 [&>*:nth-child(2)]:col-span-2  [&>*:nth-child(5)]:col-span-2 [&>*:nth-child(5)]:justify-center">
          {inputs.map((v, i) => (
            <div key={i} className="flex flex-col">
              <label htmlFor={i}>{v.placeholder}</label>
              {v.type == "select" ? (
                <select
                  disabled={loading}
                  name={v.name}
                  required
                  onChange={handler}
                  className="py-2 px-1 rounded-md outline outline-1 outline-gray-500"
                >
                  <option disabled selected value="">
                    Catagory
                  </option>
                  {v?.options?.map((v, i) => (
                    <option key={i} value={v?.value ? v.value : v}>
                      {v.text ? v.text : v}
                    </option>
                  ))}
                </select>
              ) : v.type == "textarea" ? (
                <textarea
                  disabled={loading}
                  onChange={handler}
                  name={v.name}
                  required
                  className="outline outline-1 outline-gray-500 w-full rounded py-2 px-1 block"
                  placeholder={v.placeholder}
                />
              ) : (
                <input
                  id={i}
                  disabled={loading}
                  onChange={handler}
                  name={v.name}
                  required
                  className="px-2 py-2 rounded-md outline outline-1 outline-gray-500"
                  type={v.type}
                  placeholder={v.placeholder}
                />
              )}
            </div>
          ))}
          <CldUploadWidget
            uploadPreset="mhubslt3"
            onSuccess={(results) => {
              setImg(results.info.secure_url);
            }}
          >
            {({ open }) => {
              return (
                <button
                  className="bg-blue-600 py-2 px-4 rounded-xl text-white"
                  type="button"
                  onClick={() => open()}
                >
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        <div className="flex justify-end gap-3 items-center">
          <button
            type="reset"
            className="border border-blue-400 py-2 px-3 rounded-md"
          >
            Reset
          </button>
          <button type="submit" className="bg-blue-400 py-2 px-3 rounded-md">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
