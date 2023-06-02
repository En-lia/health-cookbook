import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';
import { getTags, createTag, TagType, APICreateTagParameters } from './TagAPI';

export const useGetTags = (options?: UseQueryOptions<TagType[]>) => {
    return useQuery<TagType[]>('tags', getTags, options);
};

export const useCreateTag = (options:UseMutationOptions<unknown, AxiosError<any>, APICreateTagParameters>) => {
    return useMutation(createTag, options);
};
