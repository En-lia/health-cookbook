export type OpenNotificationType = {
    message?: string,
    description?: string,
    type?: 'success' | 'info' | 'warning' | 'error',
    onClose?: () => any,
    duration?: number
};