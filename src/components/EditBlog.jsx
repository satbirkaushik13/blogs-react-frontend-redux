import React, { useEffect, useState } from 'react'
import CreateBlog from './CreateBlog'
import { useParams } from 'react-router-dom';
import { getBlog } from '../http/Api';
import { useDispatch, useSelector } from 'react-redux';
import { addObject } from '../slices/blogsSlice';
import { useTranslation } from 'react-i18next';

const EditBlog = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const blog = useSelector((state) => state.blogs.list.find(blog => blog.id === parseInt(id)));
    const dispatch = useDispatch();
    const fetchBlog = async () => {
        try {
            const { response: result, error } = await getBlog(id);
            if (error) {
                toast.error(t('Failed to get blog. Please try again later.'));
                console.error('Error:', error);
            } else if (result) {
                if (!result.status) {
                    toast.error(result.message);
                } else {
                    dispatch(addObject(result.data));
                }
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }
    useEffect(() => {
        if (!blog) {
            fetchBlog();
        }
    }, [id]);
    return (
        <>
            {blog ? <CreateBlog defaultValues={blog} /> : <p>{t("Loading...")}</p>}
        </>
    )
}

export default EditBlog