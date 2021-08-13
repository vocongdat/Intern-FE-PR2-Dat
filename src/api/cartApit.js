import axiosClient from './axiosClient';

const cartApi = {
    getByUser: (userId) => {
        const url = `/users/${userId}/carts`;
        return axiosClient.get(url);
    },

    getCartById: (id) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },

    add: (data) => {
        const url = '/carts';
        return axiosClient.post(url, data);
    },

    update: (data) => {
        const url = `/carts/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove: (id) => {
        const url = `/carts/${id}`;
        return axiosClient.delete(url);
    },
    addOrder: (data) => {
        const url = '/checkout';
        return axiosClient.post(url, data);
    },
    getOrder: (userName) => {
        const url = `/checkout/?user=${userName}`;
        return axiosClient.get(url);
    },
};

export default cartApi;
