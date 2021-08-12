import axiosClient from './axiosClient';

const managementApi = {
    getUsers: (username) => {
        const url = `/users?user=${username}`;
        return axiosClient.get(url);
    },

    getAllUsers: (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    },

    updateUser: (data) => {
        const url = `/users/${data.id}`;
        return axiosClient.patch(url, data);
    },

    getUsersById: (id) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },

    getCart: (params) => {
        const url = '/carts';
        return axiosClient.get(url, { params });
    },
    getFavoriteByUser: (userId) => {
        const url = `users/${userId}/wish`;
        return axiosClient.get(url);
    },
    getCommentByVegetable: (userId) => {
        const url = `/vegetables/${userId}/comments`;
        return axiosClient.get(url);
    },
    register: (data) => {
        const url = '/users';
        return axiosClient.post(url, data);
    },
    addComment: (data) => {
        const url = '/comments';
        return axiosClient.post(url, data);
    },

    getCartCheckout: (params) => {
        const url = '/checkout';
        return axiosClient.get(url, { params });
    },
    setOrderState: (data) => {
        const url = `checkout/${data.id}`;
        return axiosClient.patch(url, data);
    },

    setIsAdmin: (data) => {
        const url = `users/${data.id}`;
        return axiosClient.patch(url, data);
    },
};

export default managementApi;
