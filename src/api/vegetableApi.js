import axiosClient from './axiosClient';

const vegetableApi = {
    getAll: (params) => {
        const url = '/vegetables';
        return axiosClient.get(url, { params });
    },

    getById: (id) => {
        const url = `/vegetables/${id}`;
        return axiosClient.get(url);
    },

    add: (data) => {
        const url = '/vegetables';
        return axiosClient.post(url, data);
    },

    update: (data) => {
        const url = `/vegetables/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove: (id) => {
        const url = `/vegetables/${id}`;
        return axiosClient.delete(url);
    },

    getCategories: (params) => {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },
};

export default vegetableApi;
