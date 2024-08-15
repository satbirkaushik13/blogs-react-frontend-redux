import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBlog } from '../http/Api';
import { useTranslation } from 'react-i18next';

const BlogDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blogs.list.find(blog => blog.id === parseInt(id)));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlog = async () => {
        try {
            const { response: result, error } = await getBlog(params.id);
            if (error) {
                let errMsg = t('Failed to get blog. Please try again later.');
                setError(errMsg);
                toast.error(errMsg);
                console.error('Error:', error);
            } else if (result) {
                if (!result.status) {
                    setError(result.message);
                    toast.error(result.message);
                } else {
                    dispatch(addObject(result.data));
                }
            }
        } catch (e) {
            let errMsg = t('Unable to fetch blog details.');
            setError(errMsg);
            toast.error(errMsg);
            console.error('Error:', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!blog) {
            fetchBlog();
        } else {
            setLoading(false);
        }
    }, [blog, id]);

    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-5 mb-4">
                <h2>{blog.title}</h2>
                <div>
                    <Link to="/" className='btn btn-dark'>{t('Back')}</Link>
                </div>
            </div>
            <div className="blogs-listing">
                <div className="row">
                    {
                        loading ? (<div>{t("Loading...")}</div>) :
                            error ? (<div>{t("Error")}: {error}</div>) :
                                (
                                    <div className="col-md-12">
                                        <p>by <strong>{blog.author}</strong> on {blog.date}</p>
                                        {
                                            (blog.image) && <img className='w-50' src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`} />
                                        }
                                        <div className='mt-2 text-justify' dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogDetail