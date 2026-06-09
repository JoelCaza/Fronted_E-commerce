import { apiFetch } from './api';

export const login = (email, password) => {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
};