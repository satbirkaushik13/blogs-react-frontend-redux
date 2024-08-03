import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const Blogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const fetchBlogs = async (page = 1) => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ page })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            if (!result.status) {
                toast.error(result.message);
            } else {
                const data = result.data;
                setBlogs(data.blogs);
                setPage(data.page);
                setTotalPages(data.pages);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const goToPage = (page) => {
        setPage(page);
        fetchBlogs(page);
    };

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
                                <Pagination page={page} totalPages={totalPages} goToPage={goToPage} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Blogs