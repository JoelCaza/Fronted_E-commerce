import { apiFetch, apiDownload } from './api';

export const getProducts = () => {
    return apiFetch('/productos');
};

export const getProductById = (id) => {
    return apiFetch(`/productos/${id}`);
};

export const createProduct = (data) => {
    return apiFetch('/productos', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

export const updateProduct = (id, data) => {
    return apiFetch(`/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};

export const deleteProduct = (id) => {
    return apiFetch(`/productos/eliminarProducto/${id}`, {
        method: 'DELETE'
    });
};

export const downloadInventoryReport = () => {
    return apiDownload('/productos/reporte-pdf', 'reporte-inventario.pdf');
};