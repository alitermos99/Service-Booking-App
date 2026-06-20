import api from './../lib/api';

export const getService = async (id) => {
    const response = await api.get(
        `/api/v1/services/${id}`
    );

    return response.data;
}

export const getServices = async ({ cursor, limit = 10, sortField = 'createdAt', sortOrder = 'desc', filter } = {}) => {
    const params = new URLSearchParams({
        limit,
        sortField,
        sortOrder,
        ...(cursor && { cursor }),
        ...(filter && { filter })
    });

    const response = await api.get(`/api/v1/services/all-services?${params}`);
    return response.data;
}
