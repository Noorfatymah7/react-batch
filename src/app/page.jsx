import React from 'react'
import BlogCard from '../components/BlogCard'
import axios from 'axios'

async function getproducts() {
  try {
    const {data} = await axios.get("https://dummyjson.com/products")
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

const page = async () => {
  const {products,total} = await getproducts()
  console.log(total)
  const arr = [1, 2, 3, 4, 5]
  return (
    <>
      <div className='h-[40vh] w-full grid place-content-center text-3xl font-semibold border-2 bg-blue-500/25 rounded-md border-blue-600'>
        <h1>Blogs</h1>
      </div>
      <div className='grid grid-cols-3 gap-4  py-4 px-2'>
        {products.map((v,i) => (
          <BlogCard products={v}  />
        ))}

      </div>
    </>
  )
}

export default page
