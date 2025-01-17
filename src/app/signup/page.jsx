"use client"
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
    const [form,setForm] =useState({
        Username:"",
        Email:"",
        Password:"" 
    })

    function Handler(e){
        const{value,name} = e?.target
        setForm({...form,[name]:value})
    }

    async function Submite(e){
        e.preventDefault()
        console.log(form)
        try {
            const {data} = await axios.post("/api/auth",form)
            console.log(data)
            if(!data.success){
                toast.error("Somthing Went Wrong!")
                return
            }
            toast.success("User Created")
            
        } catch (error) {
            console.log(error)
            toast.error("Somthing Went Wrong!")
        }
    }
  return (
    <div className="flex justify-center items-center py-10">
      <div class="form w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 bg-[#DFA16A] r flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <p class="text-[#A15A3E] translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0">
          Welcome
        </p>

        <div class="capitalize">
          <p class="text-2xl text-[#7F3D27] pb-5">Create Your Account</p>
          <form onSubmit={Submite} class="flex flex-col gap-3">
            <div class="flex flex-col items-start w-full">
              <label for="name" class="text-sm text-[#7F3D27] font-semibold">
                Name
              </label>
              <input
              name="Username"
              value={form?.Username}
              onChange={(e)=>Handler(e)}
                type="text"
                placeholder="Enter Your Name"
                class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
            </div>

            <div class="flex flex-col items-start w-full">
              <label for="email" class="text-sm text-[#7F3D27] font-semibold">
                Email
              </label>
              <input
                type="email"
                name="Email"
                value={form?.Email}
                onChange={Handler}
                placeholder="Enter Your Email"
                class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
            </div>

            <div class="flex flex-col items-start w-full">
              <label
                for="password"
                class="text-sm text-[#7F3D27] font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                name="Password"
                value={form?.Password}
                onChange={Handler}
                placeholder="Enter Your Password"
                class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
            </div>

            <div class="inline-flex gap-2 items-center text-[#A15A3E]">
              <input
                type="checkbox"
                name=""
                id=""
                class="w-3 h-3 focus:border-0 focus:outline-none focus:accent-[#7F3D27] checked:accent-[#A15A3E] checked:text-[#A15A3E] px-1 py-1"
                checked=""
              />
              <p class="text-xs">
                By Signing Agree with
                <span class="font-semibold">Term &amp; Policy</span>
              </p>
            </div>

            <div class="inline-flex gap-5">
              <button type="submit" class="px-6 focus:outline-none focus:scale-110 font-semibold text-xs py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-[#7F3D27] shadow-[#7F3D27] shadow-lg">
                Sign Up
              </button>
          
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
