import React, { useEffect } from 'react'
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBlog = ({ defaultValues }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: defaultValues || {}
    });
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    useEffect(() => {
        reset(defaultValues);
        setDescription(defaultValues?.description || '');
    }, [defaultValues, reset]);

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    const onChangeImageField = (e) => {
        setImage(e.target.files[0]);
    }

    const formSubmit = async (data) => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const res = await fetch("http://127.0.0.1:8000/api/blogs/save", {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            if (!result.status) {
                Object.entries(result.errors).forEach(([field, error]) => {
                    toast.error(field + ": " + error);
                });
            } else {
                toast(result.message);
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error adding blog');
        }
    }

    return (
        <div className='container mb-5'>
            <div className="d-flex justify-content-between mt-5 mb-4">
                <h4>{defaultValues ? 'Update' : 'Create'}</h4>
                <a href="/" className='btn btn-dark'>Back</a>
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
                            <label className="form-label">Image</label>
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
                        <button type="submit" className='btn btn-dark'>Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog