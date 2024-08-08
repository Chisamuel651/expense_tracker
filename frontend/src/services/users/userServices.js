import axios from 'axios';
import { BASE_URL } from "../../utils/url";

//! login
export const loginAPI = async({ email, password }) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, {
            email,
            password,
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error in loginAPI:', error);
        throw error;
    }
};

//! register
export const registerAPI = async({ email, password, username }) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/register`, {
            email,
            password,
            username,
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error in loginAPI:', error);
        throw error;
    }
};
