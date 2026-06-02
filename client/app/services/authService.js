import api from "../lib/api";

export const login = async (credentials) => {
    const response = await api.post(
        '/api/v1/auth/login',
        credentials
    );

    return response.data;
}

export const register = async (credentials) => {
    const response = await api.post(
        '/api/v1/auth/register',
        credentials
    );

    return response.data;
}

export const logout = async () => {
    const response = await api.post(
        '/api/v1/auth/logout'
    );

    return response.data;
}

export const getProfile = async () => {
    const response = await api.get(
        '/api/v1/auth/profile'
    )

    return response.data;
}