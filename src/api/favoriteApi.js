import axiosClient from './axiosClient';

const favoriteApi = {
    getAll: (params) => {
        const url = '/wish';
        return axiosClient.get(url, { params });
    },

    getById: (id) => {
        const url = `/wish/${id}`;
        return axiosClient.get(url);
    },

    add: (data) => {
        const url = '/wish';
        return axiosClient.post(url, data);
    },

    update: (data) => {
        const url = `/wish/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove: (id) => {
        const url = `/wish/${id}`;
        return axiosClient.delete(url);
    },
};

export default favoriteApi;
