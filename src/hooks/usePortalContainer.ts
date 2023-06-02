import { useCallback, useEffect, useMemo } from 'react';

export const usePortalContainer = (visible:boolean) => {
    const element = useMemo(() => {
        return document.createElement('div');
    }, []);

    useEffect(() => {
        if (visible) {
            document.documentElement.append(element);
        }
    }, [visible, element]);

    const removeElement = useCallback(() => {
        element?.remove();
    }, [element]);

    return { removeElement, element };
};