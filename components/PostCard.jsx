import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({post}) => {
    return (
        <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-10' key={post.title}>
            <div className='relative overflow-hidden  pb-80 mb-6 lg:rounded-lg'>
                <Link href={`/post/${post.slug}`}>
                    <img 
                        src={post.featuredimage.url} 
                        alt={post.title} 
                        className='object-top absolute h-auto w-full object-cover shadow-md rounded-t-lg lg:rounded-lg'
                    />
                </Link>
            </div>
            <h1 className='transition duration-700 mb-4 cursor-pointer hover:text-pink-600 text-3xl font-semibold mx-4 lg:mx-0'>
                <Link href={`/post/${post.slug}`}>
                    {post.title}
                </Link>
            </h1>
            <p className='text-lg text-gray-700 font-normal px-4 lg:px-0 mb-4'>
                <Link href={`/post/${post.slug}`}>
                    {post.excerpt}
                </Link>
            </p>
            <div className='block flex lg:flex mb-4 w- px-4 lg:px-0'>
                <div className='flex lg:mb-0 lg:w-auto mr-8'>
                    <img 
                        src={post.author.photo.url} 
                        alt={post.author.name}
                        height="30px" 
                        width="30px" 
                        className='align-middle rounded-full'
                    />
                    <p className='inline align-middle text-gray-700 ml-2 text-lg'>
                        {post.author.name}
                    </p>
                </div>
                <div className='flex text-gray-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                     <p className='inline align-middle text-gray-700 ml-1 text-lg'>
                        {moment(post.createdAt).format('MMMM DD, YYYY')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostCard
