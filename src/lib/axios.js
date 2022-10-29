import axios from "axios";

const api  = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wc/store/',
    headers: {
        Accept: 'application/json',
    },
});


export default api;