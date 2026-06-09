import { apiFetch } from './api';

export const getCategories = () => {
    return apiFetch('/categorias');
};

export const createCategory = (nombre) => {
    return apiFetch('/categorias', {
        method: 'POST',
        body: JSON.stringify({ nombre })
    });
};

export const deleteCategory = (id) => {
    return apiFetch(`/categorias/eliminarCategoria/${id}`, {
        method: 'DELETE'
    });
};