import Link from 'next/link'
import React from 'react'

const BlogCard = ({products}) => {
    console.log(products)
    return (
        <Link className='relative group border  shadow-md shadow-black/30' href={"/"}>
            <img className='w-full h-full object-cover' src={products.thumbnail} alt="" />
            <div className='bg-blue-600 py-2 px-4  flex absolute bottom-0 left-0'>
                <h2 className='text-xl text-white'>{products.title}</h2>
            </div>
            <span className='bg-red-500 absolute -top-10 right-0 px-2 py-1 text-white opacity-0 group-hover:opacity-100 group-hover:top-0 duration-150'>
                $ {Math.round(products.price)} 
               
            </span>
        </Link>
    )
}

export default BlogCard
