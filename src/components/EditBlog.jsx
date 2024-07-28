import React, { useEffect, useState } from 'react'
import CreateBlog from './CreateBlog'
import { useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();
    const fetchBlog = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/blogs/' + params.id);

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            if (!result.status) {
                toast.error(result.message);
            } else {
                setBlog(result.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {        
        fetchBlog();
    }, [params.id]);
    return (
        <>
            {blog ? <CreateBlog defaultValues={blog} /> : <p>Loading...</p>}
        </>
    )
}

export default EditBlog