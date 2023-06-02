import { $authHost } from '../index';

export type GroupType = {
    id: number,
    title: string,
    label: string,
};

export type APICreateGroupParameters = Omit<GroupType, 'id'>;
export const createGroup = async ({ title, label }:APICreateGroupParameters): Promise<any> => {
    const { data } = await $authHost.post('api/groups', { title, label });
    return data;
};

export const getGroups = async ():Promise<GroupType[]> => {
    const { data } = await $authHost.get('api/groups');
    return data;
};