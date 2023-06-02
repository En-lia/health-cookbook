import { useQuery, UseQueryOptions, useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import {
    APIUserLoginParameters,
    APIUserRegistrationParameters,
    checkUser,
    login,
    registration,
} from './userAPI';

export const useCheckUser = (options?: UseQueryOptions) => useQuery('user', checkUser, { retry: false, ...options });

export const useRegistration = (options:UseMutationOptions<unknown, AxiosError<any>, APIUserRegistrationParameters>) => {
    return useMutation(registration, options);
};

export const useLogin = (options:UseMutationOptions<unknown, AxiosError<any>, APIUserLoginParameters>) => {
    return useMutation(login, options);
};