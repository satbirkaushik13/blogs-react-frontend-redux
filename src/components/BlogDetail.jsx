import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBlog } from '../http/Api';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();
    const fetchBlog = async () => {
        try {
            const { response: result, error } = await getBlog(params.id);
            if (error) {
                toast.error('Failed to get blog. Please try again later.');
                console.error('Error:', error);
            } else if (result) {
                if (!result.status) {
                    toast.error(result.message);
                } else {
                    console.log(result);
                    setBlog(result.data);
                }
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-5 mb-4">
                <h2>{blog.title}</h2>
                <div>
                    <a href="/" className='btn btn-dark'>Back</a>
                </div>
            </div>
            <div className="blogs-listing">
                <div className="row">
                    <div className="col-md-12">
                        <p>by <strong>{blog.author}</strong> on {blog.date}</p>
                        {
                            (blog.image) && <img className='w-50' src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`} />
                        }
                        <div className='mt-2 text-justify' dangerouslySetInnerHTML={{__html: blog.description}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail