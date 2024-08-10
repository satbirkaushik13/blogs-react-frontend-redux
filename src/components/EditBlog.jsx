import React, { useEffect, useState } from 'react'
import CreateBlog from './CreateBlog'
import { useParams } from 'react-router-dom';
import { getBlog } from '../http/Api';

const EditBlog = () => {
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
                    setBlog(result.data);
                }
            }
        } catch (e) {
            console.error('Error:', e);
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