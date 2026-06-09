import { apiFetch } from './api';

export const sendMessage = (mensaje) => {
    return apiFetch('/chat', {
        method: 'POST',
        body: JSON.stringify({ mensaje })
    });
};