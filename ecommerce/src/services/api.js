const BASE_URL = import.meta.env.VITE_PUBLIC_URL;

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
