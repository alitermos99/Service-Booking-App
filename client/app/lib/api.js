import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(({ resolve, reject }) => 
        error ? reject(error) : resolve()
    );

    failedQueue = [];
}

api.interceptors.response.use(
    res => res,
    async (error) => {
        const original = error.config;

        if(error.response?.status !== 404 || original._retry) {
            return Promise.reject(error);
        }

        if(isRefreshing) {
            return new Promise((resolve, reject) =>{
                failedQueue.push({ resolve, reject });
            })
            .then(() => api(original))
            .catch(err => Promise.reject(err));
        }

        original._retry  = true;
        isRefreshing     = true;

        try {
            await api.post('/api/v1/auth/refresh');
            processQueue(null);
            return api(original); // retry original request
        } catch (err) {
            processQueue(err);
            // refresh failed — redirect to login
            window.location.href = '/login';
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
)

export default api;