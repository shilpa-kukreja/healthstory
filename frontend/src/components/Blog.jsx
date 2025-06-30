
import React, { useContext } from 'react'

import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import '../assets/Css/Blog.css';
import { FaFolder } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";

const Blog = () => {

    const { blog } = useContext(ShopContext)
    console.log(blog)
    const displayBlogs = blog.slice(0, 3);
    return (
        <>
            <div className="blog_container">
                <div className="container">
                    <div className="blog_slide ">

                        {displayBlogs.map((blogItem, id) => (

                            <div key={id} className="blog_item">

                                 <div className="blog_image_wrapper">

                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${blogItem.blogImg.url}`} alt={blogItem.blogName} className="blog_image" />




                                    
                                 </div>

                                    <div className="blog_content">
                                        <p className="blog_date">{new Date(blogItem.blogDate).toISOString().split("T")[0]}</p>

                                           <p className='blog_soapName'> <LuUserRound /> &nbsp; Admin</p>
                                        <h3 className="blog_name">{blogItem.blogName}</h3>
                                        {/* <p className="blog_subtitle">{blogItem.subtile}</p> */}
                                        <Link to={`/blog-details/${blogItem.slug}`} className="read_more"> Read More </Link>
                                    </div>

                            
                            </div>
                        ))}







                    </div>
                </div>
            </div>

        </>
    )
}

export default Blog