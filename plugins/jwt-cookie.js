import Cookies from 'js-cookie';

export default function({ $axios }) {
    $axios.interceptors.request.use((config) => {
        const token = Cookies.get('jwt');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });
}