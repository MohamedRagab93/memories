import axios from 'axios';

// const url = process.env.REACT_APP_API_URL 
//     ? `${process.env.REACT_APP_API_URL}/posts`  
//            : 'http://localhost:5000/posts';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000" });

// const url = 'https://memories-production-a2ec.up.railway.app/posts';

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);