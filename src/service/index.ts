import axios, { AxiosRequestConfig, AxiosHeaders, AxiosError } from 'axios';
import { $UserStore } from '../components/App/App';
import { LOGIN_ROUTE } from '../utils/const';
import { globalNavigate } from '../router/GlobalHistory';

const $host = axios.create({
    baseURL: process.env.APP_HOST,
});
const $authHost = axios.create({
    baseURL: process.env.APP_HOST,

});

const authInterceptor = (config: AxiosRequestConfig) => {
    if (config.headers) (config.headers as AxiosHeaders).set('authorization', `Bearer ${localStorage.getItem('token')}`);
    return config;
};

const errorInterceptor = async (error: AxiosError) => {
    if (error?.response?.status === 401) {
        $UserStore.setIsAuth(false);
        globalNavigate(LOGIN_ROUTE);
    }

    throw error;
};

$authHost.interceptors.request.use(authInterceptor);
$host.interceptors.response.use((response) => response, errorInterceptor);
$authHost.interceptors.response.use((response) => response, errorInterceptor);

export {
    $host,
    $authHost,
};