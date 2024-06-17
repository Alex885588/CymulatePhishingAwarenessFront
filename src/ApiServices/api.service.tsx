import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export class ApiService {
    token: string = ''

    setToken(token: string) {
        this.token = token
    }

    async sendEmailNotif(username: string, body: string) {
        try {
            const response = await axios.post(`${BASE_URL}/phishing-attempts`, { username, body }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            });
            return response.data
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    }

    async listOfNotifByCurrentAdmin() {
        try {
            const response = await axios.get(`${BASE_URL}/phishing-attempts`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            });
            return response.data.data
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${BASE_URL}/users/signin`, { username, password });
            if (response.data.data) {
                this.token = response.data.data.token
                return response.data.data;
            }
            throw 'Invalid Credentials'
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async isTokenValid() {
        try {
            const response = await axios.post(`${BASE_URL}/users/isTokenValid`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error token validation:', error);
            throw error;
        }
    }

    async register(username: string, password: string) {
        try {
            const response = await axios.post(`${BASE_URL}/users/register`, { username, password }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.log('Error registering', error);
            throw error
        }
    }
}
