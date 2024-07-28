import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { toast } from 'react-toastify';

const Blogs = () => {
    const [blogs, setBlogs] = useState(null);
    const fetchBlogs = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/blogs');

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            if (!result.status) {
                toast.error(result.message);
            } else {
                setBlogs(result.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, []);

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
                                {blogs === null ? 'Loading...' : 'No records found!' }
                            </div>
                        ) : (
                            blogs.map((blog) => (
                                <BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Blogs