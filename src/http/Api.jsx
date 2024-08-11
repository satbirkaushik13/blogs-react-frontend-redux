const BASE_URL = 'http://127.0.0.1:8000/';
const API_URL = 'api/blogs/';

const apiRequest = async (url, method, data = null) => {
    const options = {
        method,
        body: data,
    };

    try {
        const response = await fetch(`${BASE_URL}${API_URL}${url}`, options);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error during ${method} request to ${url}:`, error);
        throw error;
    }
};

export const api = async (endpoint, method, data) => {
    let response = null; 
    let error = null; 
    try {
        response = await apiRequest(endpoint, method, data);
    } catch (e) {
        error = e;
    }

    return { response, error };
};

export const saveBlog = (data) => api('save', 'POST', data);
export const getBlog = (id) => api(id, 'GET');
export const updateBlog = (id, data) => api(id + '?_method=PUT', 'POST', data);
export const deleteBlog = (id) => api(id, 'DELETE');
export const getAllBlogs = (page) => api(`?page=${page}`, 'GET');
export const getBlogImage = (img) => {
    return (img) ? `${BASE_URL}uploads/blogs/${img}` : 'https://placehold.co/600x400';
}