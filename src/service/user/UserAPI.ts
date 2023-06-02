import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '../index';

export type UserType = {
    id: number,
    email: string,
    password: string,
    name: string,
    roles: number[],
};

export type APIUserRegistrationParameters = Omit<UserType, 'id' | 'roles'>;
export const registration = async ({ email, password, name }: APIUserRegistrationParameters):Promise<UserType> => {
    const { data } = await $host.post('api/user/registration', { email, password, name });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export type APIUserLoginParameters = Omit<UserType, 'id' | 'name' | 'roles'>;
export const login = async ({ email, password }: APIUserLoginParameters):Promise<UserType> => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const checkUser = async ():Promise<UserType> => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};