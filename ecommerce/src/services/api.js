const BASE_URL = import.meta.env.VITE_PUBLIC_URL;

// Extract root URL from API URL (remove /api/v1 or similar)
export const ROOT_URL = BASE_URL.split('/api')[0];

export const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop";
    if (imagePath.startsWith('http')) return imagePath;
    return `${ROOT_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const getToken = () => {
    const rawToken = localStorage.getItem("token");
    return rawToken ? rawToken.replace(/['"]+/g, '') : null;
};

export const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    let data;
    try {
        data = await response.json();
    } catch (err) {
        data = null;
    }

    if (!response.ok) {
        // Rechazar promesa si no es un código 2xx
        const error = new Error(data?.error || `Error: ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

export const apiDownload = async (endpoint, filename) => {
    const token = getToken();
    const headers = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`Error al descargar: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

