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

export const updateProfile = async (body) => {
    const response = await api.put(
        '/api/v1/auth/profile',
        body
    )

    return response.data;
}

export const changePassword = async (body) => {
    const response = await api.patch(
        '/api/v1/auth/change-password',
        body
    )

    return response.data;
}

export const deactivateUser = async () => {
    const response = await api.patch(
        '/api/v1/auth/deactivate-user',
    )

    return response.data;
}