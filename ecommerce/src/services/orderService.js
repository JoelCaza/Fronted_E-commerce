import { apiFetch } from './api';

export const getMisPedidos = () => {
    return apiFetch('/pedidos/mis-compras');
};

export const checkout = (payload) => {
    return apiFetch('/pedidos/checkout', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
};