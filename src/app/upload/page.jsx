"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const inputs = [
    { placeholder: "Title", name: "title", type: "text" },
    { placeholder: "Catagory", name: "catagory", type: "select" },
    { placeholder: "Author", name: "author", type: "text" },
    { placeholder: "Date", name: "date", type: "date" },
    { placeholder: "Image", name: "img", type: "upload" },
    { placeholder: "Discription", name: "desc", type: "textarea" },
]

const page = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)


    function handler(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function submit(e) {
        e.preventDefault()
        setLoading(true)
        setInterval(() => {
            setLoading(false)
        }, 3000)
        toast.success('Your Blog Have Been Submittted!')

    }

    return (
        <div className='flex justify-center items-center'>
            <Toaster position="bottom-right"
                reverseOrder={false} />
            <form onSubmit={submit} className='bg-blue-300/40 rounded-lg space-y-4 py-4 px-6 max-w-[600px] shadow-md'>
                {/* Header of the form ===================================== */}
                <div>
                    <div className='flex justify-start items-center gap-2'>
                        <div className='h-2 w-2 bg-blue-900 rounded-full animate-pulse ' />
                        <h1 className='text-xl font-semibold mb-1 first-letter:text-blue-800'>Blog Descreption</h1>
                    </div>
                    <p className='text-gray-600 text-xs'>Please fill the form Completely</p>
                </div>
                {/* Inputs of the from ================================ */}
                <div className='grid grid-cols-2 gap-3'>
                    {inputs.map((v, i) => (
                        <div key={i} className='flex flex-col'>
                            <label htmlFor="" className=''>{v.placeholder}</label>
                            {v.type == "select" ?
                                <select disabled={loading} name={v.name} onChange={handler} className='py-2 rounded-md'>
                                    <option value="News">News</option>
                                    <option value="Events">Events</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Gaming">Gaming</option>
                                </select>
                                :
                                <input disabled={loading} onChange={handler} name={v.name} className='px-2 py-2 rounded-md' type={v.type} placeholder={v.placeholder} />
                            }
                        </div>
                    ))}
                </div>
                <div className='flex justify-end gap-3 items-center'>
                    <button type='reset' className='border border-blue-400 py-2 px-3 rounded-md'>Reset</button>
                    <button type='submit' className='bg-blue-400 py-2 px-3 rounded-md'>
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default page
