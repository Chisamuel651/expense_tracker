import axios from 'axios';
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from '../../utils/getUserFromStorage';

// ! token
const token = getUserFromStorage();

//! add category
export const addCategoryAPI = async({ type, name }) => {
    try {
        const response = await axios.post(`${BASE_URL}/categories/create`, {
            type,
            name,
        }, { withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
        return response.data;
    } catch (error) {
        console.error('Error in addCategoryAPI:', error);
        throw error;
    }
};

//! read categories
export const listCategoriesAPI = async() => {
    const response = await axios.get(`${BASE_URL}/categories/lists`, {headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
};

//! update category
export const updateCategoryAPI = async({ type, name, id }) => {
    try {
        const response = await axios.put(`${BASE_URL}/categories/update/${id}`, {
            type,
            name,
        }, { withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
        return response.data;
    } catch (error) {
        console.error('Error in addCategoryAPI:', error);
        throw error;
    }
};

//! delete category
export const deleteCategoryAPI = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, { withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
        return response.data;
    } catch (error) {
        console.error('Error in addCategoryAPI:', error);
        throw error;
    }
};