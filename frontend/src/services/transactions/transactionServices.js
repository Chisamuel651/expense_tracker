import axios from 'axios';
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from '../../utils/getUserFromStorage';

// ! token
const token = getUserFromStorage();

//! add transaction
export const addTransactionAPI = async({ type, category, date, description, amount }) => {
    try {
        const response = await axios.post(`${BASE_URL}/transactions/create`, {
            type,
            category,
            date,
            description,
            amount
        }, { withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
        return response.data;
    } catch (error) {
        console.error('Error in addTransactionAPI:', error);
        throw error;
    }
};


//! read transaction
export const listTransactionsAPI = async({category, type, startDate, endDate}) => {
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
        params: {category, type, endDate, startDate},
        headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
};

//! delete transaction
export const deleteTransactionAPI = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, { withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
        return response.data;
    } catch (error) {
        console.error('Error in addTransactionsAPI:', error);
        throw error;
    }
};