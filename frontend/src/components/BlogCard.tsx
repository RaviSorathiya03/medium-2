import React from 'react'
import { Link } from 'react-router-dom'

interface Blogs{
    BlogCardName: string,
    title: string, 
    content: string,
    publishDate: string
    id: number
}

const BlogCard = ({
    id,
    BlogCardName,
    title,
    content,
    publishDate
}: Blogs) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className='p-6 w-screen max-w-screen-md cursor-pointer'>
        <div className='flex'>
            <div className='flex justify-center flex-col'>
            <Avatar name={BlogCardName} size={8}/>
            </div>
            <div className='font-extralight pl-2 flex justify-center flex-col'>
            {BlogCardName}
            </div> 
            <div className='text-[4px] flex justify-center flex-col pl-2'>
            &#9679;
            </div>
            <div className='pl-2 font-thin text-slate-400 flex justify-center flex-col'>
            {publishDate}
            </div>
        </div>
        <br />
        <div className='text-xl font-semibold'>
            {title}
        </div>
        <br />
        <div className='text-md font-thin'>
            {content.slice(0, 100)+"..."}
        </div>
        <div className='text-slate-400 text-sm font-thin mt-5'>
            {`${Math.ceil(content.length/100)} minutes(s)`}
        </div>
        <hr className='mt-4'/>
    </div>
    </Link>
  )
}

 export function Avatar({name, size}: {name:string, size?: number}){
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
}

export default BlogCard