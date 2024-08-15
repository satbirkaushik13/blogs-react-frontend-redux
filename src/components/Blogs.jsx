import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlogCard from './BlogCard';
import { toast } from 'react-toastify';
import Pagination from '../helper/Pagination';
import { getAllBlogs } from '../http/Api';
import { setBlogs } from '../slices/blogsSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Blogs = () => {
    const refPage = useRef();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.list);
    const [page, setPage] = useState(1);
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
                    refPage.current = page
                    setPage(result.data.page);
                    setTotalPages(result.data.pages);
                    dispatch(setBlogs(result.data.blogs));
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        if (refPage.current != page) {
            fetchBlogs(page);
        }
    }, [page]);

    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-5 mb-4">
                <h4>{t("blogs")}</h4>
                <Link to="/create" className='btn btn-success'>{t("Create")}</Link>
            </div>
            <div className="blogs-listing">
                <div className="row">
                    {
                        blogs === null || blogs.length === 0 ? (
                            <div className="col-12 text-center p-4 bg-light border border-1">
                                {blogs === null ? t('Loading...') : t('No records found!')}
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