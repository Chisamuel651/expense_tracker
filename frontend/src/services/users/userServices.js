import axios from 'axios';
import { BASE_URL } from "../../utils/url";

import { getUserFromStorage } from '../../utils/getUserFromStorage';

// ! token
const token = getUserFromStorage();


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

//! change password
export const changePasswordAPI = async (newPassword) => {
    console.log(newPassword);
    const response = await axios.put(`${BASE_URL}/users/change-password`, {
        newPassword,
    }, { withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response.data;
};

//! update profile
export const updateProfileAPI = async({username, email}) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/update-profile`, {
            username,
            email,
        }, { withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
        return response.data;
    } catch (error) {
        console.error('Error in loginAPI:', error);
        throw error;
    }
};
