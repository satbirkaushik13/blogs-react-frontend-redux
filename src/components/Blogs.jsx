import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { toast } from 'react-toastify';
import Pagination from '../helper/Pagination';
import { getAllBlogs } from '../http/Api';


const Blogs = () => {    
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const fetchBlogs = async (page) => {
        try {
            const { response: result, error } = await getAllBlogs(page);
            if (error) {
                toast.error('Failed to fetch blogs. Please try again later.');
                console.error('Error:', error);
            } else if (result) {
                if (!result.status) {
                    toast.error(result.message);
                } else {
                    setBlogs(result.data.blogs);
                    setPage(result.data.page);
                    setTotalPages(result.data.pages);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchBlogs(page);
    }, [page]);

    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-5 mb-4">
                <h4>Blogs</h4>
                <a href="/create" className='btn btn-success'>Create</a>
            </div>
            <div className="blogs-listing">
                <div className="row">
                    {
                        blogs === null || blogs.length === 0 ? (
                            <div className="col-12 text-center p-4 bg-light border border-1">
                                {blogs === null ? 'Loading...' : 'No records found!'}
                            </div>
                        ) : (
                            blogs.map((blog) => (
                                <BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id} />
                            ))
                        )
                    }
                </div>

                {
                    1 < totalPages && (
                        <div className="row">
                            <div className="col-md-12">
                                <Pagination page={page} totalPages={totalPages} goToPage={setPage} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Blogs