
import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/Css/Blog.css';
import { IoSearchOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { LuUserRound } from "react-icons/lu";
const BlogDetail = () => {


  const { blog } = useContext(ShopContext)
  const { id } = useParams()


  const currentBlog = blog.find(item => item.slug === id);
  const relatedBlogs = blog.filter(item => item.slug !== id);



  if (!currentBlog) {
    return <div>Blog not found</div>;
  }



  return (
    <>



      <div className="blogdetail_container">
        <div className="container">
          <div class="page_header">
            <div class="breadcrumbs">
              <ul>
                <li><Link to='/'>Home</Link></li>/&nbsp;
                <li><a href="#">Blog</a></li> /&nbsp;
                <li>{currentBlog.blogName}</li>
              </ul>
            </div>
          </div>

          <div className="blog_detail_wrapper">


            <div className="blog_detail_img">
              <img src={`${import.meta.env.VITE_BACKEND_URL}${currentBlog.blogImg.url}`} width='100%' alt={currentBlog.blogName} />

              <div className="blog_inner_content">
                <h2 className='current_blog_name'>{currentBlog.blogName}</h2>

                <div className='admin'>
                  <p className=""><CgCalendarDates /> &nbsp;{new Date(currentBlog.blogDate).toISOString().split("T")[0]}</p>

                  <p>
                    <LuUserRound /> &nbsp;Admin
                  </p>
                </div>
                <p className='blog_para_content' dangerouslySetInnerHTML={{ __html:currentBlog.blogDetail}}></p>

              </div>

            </div>






            <div className="blog_posts">

              {/* <div className='blog_search'>
                <form action="">
                  <input type="text" className='form_control' placeholder='Search ' required />
                  <button type='submit' className='search_icon'>  <IoSearchOutline size={20} /></button>
                </form>
              </div> */}

              
              <h3>
                Latest Post
              </h3>
              <ul>
                {relatedBlogs.map((item) => (
                  <li key={item._id} className='related_blogs '>
                    <Link to={`/blog-details/${item._id}`} className='related_blog_box ' >
                      <img  src={`${import.meta.env.VITE_BACKEND_URL}${item.blogImg.url}`} alt={item.blogName} width="60px" style={{ marginRight: '10px' }} />
                      <div>
                        <p className="" style={{ justifyContent: 'left' }}><CgCalendarDates /> &nbsp;{new Date(currentBlog.blogDate).toISOString().split("T")[0]}</p>
                        <p className='related_blog_title'> {item.blogName}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default BlogDetail