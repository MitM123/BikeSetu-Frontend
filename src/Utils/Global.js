import axios from 'axios';

export default class Global {
    static user;

    static axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_SERVER_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    static async getUser() {
        try {
            const res = await this.httpGet('/auth/me');
            this.user = res.user;
            return res.user;
        } catch (error) {
            return null;
        }
    }

    static async httpGet(endPoint, params = {}) {
        try {
            const { data } = await this.axiosInstance.get(endPoint, {
                params,
                headers: this.getHeaders(),
            });
            return data;
        } catch (err) {
            this.handleError(err);
        }
    }

    static async httpPost(endPoint, body, isFormData = false) {
        try {
            const { data } = await this.axiosInstance.post(endPoint, body, {
                headers: this.getHeaders(isFormData),
            });
            return data;
        } catch (err) {
            this.handleError(err);
        }
    }

    static async httpPut(endPoint, body = {}) {
        try {
            const { data } = await this.axiosInstance.put(endPoint, body, {
                headers: this.getHeaders(),
            });
            return data;
        } catch (err) {
            this.handleError(err);
        }
    }

    static getHeaders(isFormData = false) {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const headers = {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`; // Append token to Authorization header
        }

        return headers;
    }

    static handleError(err) {
        // Log the error details
        console.error('API Error data:', err?.response?.data);
        throw new Error(err?.response?.data?.message || err?.response?.data?.errors[0]?.message || 'Something went wrong');
    }
}
