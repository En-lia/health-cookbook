import { $authHost } from '../index';
import { GroupType } from '../groups/GroupAPI';

export type TagType = {
    id: number,
    title: string,
    label: string,
    group: GroupType,
};

export type APICreateTagParameters = Omit<TagType, 'id' | 'group'> & { groupId: number };
export const createTag = async ({ title, label, groupId }:APICreateTagParameters): Promise<any> => {
    const { data } = await $authHost.post('api/tags', { title, label, groupId });
    return data;
};

export const getTags = async ():Promise<TagType[]> => {
    const { data } = await $authHost.get('api/tags');
    return data;
};