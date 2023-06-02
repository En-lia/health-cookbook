import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';
import { APICreateGroupParameters, createGroup, getGroups, GroupType } from './GroupAPI';

export const useGetGroups = (options?: UseQueryOptions<GroupType[]>) => {
    return useQuery<GroupType[]>('groups', getGroups, options);
};

export const useCreateGroup = (options:UseMutationOptions<unknown, AxiosError<any>, APICreateGroupParameters>) => {
    return useMutation(createGroup, options);
};
