import React, { useEffect } from 'react'
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { saveBlog, updateBlog, getBlogImage } from '../http/Api';
import { useDispatch } from 'react-redux';
import { updateObject, addObject } from '../slices/blogsSlice';

const CreateBlog = ({ defaultValues }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: defaultValues || {},
    });
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [replace_image, setRepalceImageValue] = useState(0);
    const [isUpdate, setUpdateRequest] = useState(0);

    useEffect(() => {
        reset(defaultValues);
        setDescription(defaultValues?.description || '');
        setUpdateRequest(defaultValues && defaultValues.id ? true : false);
    }, [defaultValues, reset]);

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    const onChangeImageField = (e) => {
        setImage(e.target.files[0]);
    }

    const onChangeReplaceImage = (e) => {
        setRepalceImageValue(e.target.checked ? 1 : 0)
    }

    const formSubmit = async (data) => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('replace_image', replace_image);
        Object.entries(data).forEach(([key, value]) => {
            if ('description' !== key) {
                formData.append(key, value);
            }
        });
        try {
            let result, error;
            if (isUpdate) {
                ({ response: result, error } = await updateBlog(defaultValues.id, formData));
            } else {
                ({ response: result, error } = await saveBlog(formData));
            }
            if (error) {
                toast.error('Failed to delete blog. Please try again later.');
                console.error('Error:', error);
            } else if (result) {
                if (!result.status) {
                    Object.entries(result.errors).forEach(([field, error]) => {
                        toast.error(field + ": " + error);
                    });
                } else {
                    if (isUpdate) {
                        dispatch(updateObject(result.data));
                    } else {
                        dispatch(addObject(result.data));
                    }
                    toast(result.message);
                    navigate('/');
                }
            }
        } catch (e) {
            console.error('Error:', e);
            toast.error('Error adding blog');
        }
    }

    return (
        <div className='container mb-5'>
            <div className="d-flex justify-content-between mt-5 mb-4">
                <h4>{isUpdate ? 'Update' : 'Create'}</h4>
                <Link to="/" className='btn btn-dark'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="card border-0 shadow-lg">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Title<span className='text-danger'>*</span></label>
                            <input {...register('title', { required: true })}
                                type='text'
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder='Title' />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Short Description<span className='text-danger'>*</span></label>
                            <textarea {...register('short_desc', { required: true })}
                                rows="3"
                                maxLength={200}
                                minLength={100}
                                className={`form-control ${errors.short_desc && 'is-invalid'}`}></textarea>
                            {errors.short_desc && <p className='invalid-feedback'>Short Description field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <Editor
                                containerProps={{ style: { height: '400px' } }}
                                value={description}
                                onChange={onChangeDescription} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label><br />
                            {
                                (defaultValues && defaultValues.image) && (
                                    <>
                                        <img className='w-25 mb-2' src={getBlogImage(defaultValues.image)} />
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={onChangeReplaceImage} />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Replace/Remove Image
                                            </label>
                                        </div>
                                    </>
                                )
                            }

                            <input type='file' onChange={onChangeImageField} className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Author<span className='text-danger'>*</span></label>
                            <input {...register('author', { required: true })}
                                type='text'
                                className={`form-control ${errors.author && 'is-invalid'}`}
                                placeholder='Author' />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button type="submit" className='btn btn-dark'>{isUpdate ? 'Update' : 'Create'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog