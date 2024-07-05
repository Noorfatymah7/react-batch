"use client";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { Edit, Edit2 } from "lucide-react";

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

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [img, setImg] = useState("");
  const [updatemode, setUpdatemode] = useState(false);
  const [form, setForm] = useState({
    Title: "",
    Author: "",
    Catagorise: "",
    isFeatured: "",
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
  // Adding blogs ======================================================
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

  // Update blog ======================================
  async function UpdateBlog(e) {
    e.preventDefault();
    let formdata = { ...form, Images: img };
    console.log(formdata);
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/blogs/${form._id}`, formdata);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Your Blog Have Been Updated!");
      setImg("")
      setUpdatemode(false)
      setForm({
        Title: "",
        Author: "",
        Catagorise: "",
        isFeatured: "",
        Description: "",
      })
      
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  }
  // Getblogs ==========================================

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

  // UpdateHandler =========================================
  function UpdateHandler(data) {
    console.log(data);
    setForm(data);
    setUpdatemode(true);
    setImg(data.Images);
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <form
        onSubmit={updatemode ? UpdateBlog : submit}
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
          {inputs.map((v, i) => {
            let name = v.name;
            return (
              <div key={i} className="flex flex-col">
                <label htmlFor={i}>{v.placeholder}</label>
                {v.type == "select" ? (
                  <select
                    disabled={loading}
                    name={v.name}
                    required
                    value={form[v.name]}
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
                    value={form[v.name]}
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
                    value={form[v.name]}
                    required
                    className="px-2 py-2 rounded-md outline outline-1 outline-gray-500"
                    type={v.type}
                    placeholder={v.placeholder}
                  />
                )}
              </div>
            );
          })}
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
        <div>{img && <img className="h-24 w-24" src={img} alt="" />}</div>
        <div className="flex justify-end gap-3 items-center">
          <button
            type="reset"
            className="border border-blue-400 py-2 px-3 rounded-md"
          >
            Reset
          </button>
          <button type="submit" className="bg-blue-400 py-2 px-3 rounded-md">
            {updatemode
              ? loading
                ? "Loading..."
                : "Update"
              : loading
              ? "Loading..."
              : "Submit"}
          </button>
        </div>
      </form>

      {/* Blogs List ======================================== */}
      <div className="w-full ">
        <div class="max-w-2xl mx-auto">
          <div class="flex flex-col">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
              <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden ">
                  <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Date
                        </th>
                        <th scope="col" class="p-4">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {blogs?.map((v, i) => (
                        <tr
                          key={i}
                          class="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {v.Title}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                            {v.Catagorise}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {moment(v?.createdAt).format("MMM Do YY")}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              onClick={() => UpdateHandler(v)}
                              className="text-green-400"
                            >
                              <Edit />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
